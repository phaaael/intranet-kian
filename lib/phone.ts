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
