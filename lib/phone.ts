import db from './db'

export type Phone = {
  phone: string
  employee: string
  sector: string
  walk: string
}

export async function findPhones(): Promise<Phone[]> {
  try {
    const response = await fetch("/api/phones")
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API")
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error)
    return []
  }
}

export const updatePhoneInDatabase = async (phoneID: number, updates: Partial<{ phone: string; employee: string; sector: string; walk: string; }>) => {
  try {
    const updated = await db.rp_phones.update({
      where: { phoneID },
      data: updates,
    });

    return updated;
  } catch (error) {
    console.error("Erro ao atualizar no banco de dados:", error);
    throw error;
  }
}

export const updatePhone = async (phoneID: string, updates: Partial<{ phone: string; employee: string; sector: string; walk: string; }>) => {
  try {
    const response = await fetch("/api/update-phone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneID, updates }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o ramal.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na atualização do ramal:", error);
    throw error;
  }
}
