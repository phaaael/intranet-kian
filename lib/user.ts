import db from './db'

type PhoneDetails = {
  phone: string
  employee: string
  sector: string
  walk: string
};

export default async function findPhoneByNumber(phone: string): Promise<PhoneDetails | null> {
  try {
    const phoneRecord = await db.rp_phones.findFirst({
      where: { phone: phone }
    })

    if (!phoneRecord || !phoneRecord.phone || !phoneRecord.employee || !phoneRecord.sector || !phoneRecord.walk) {
      return null;
    }

    return {
      phone: phoneRecord.phone,
      employee: phoneRecord.employee,
      sector: phoneRecord.sector,
      walk: phoneRecord.walk,
    }
  } catch (error) {
    console.error("Erro ao buscar o telefone:", error)
    return null
  }
}
