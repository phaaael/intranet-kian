import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    const phones = await db.rp_phones.findMany({
      select: {
        phone: true,
        employee: true,
        sector: true,
        walk: true,
      },
    })

    return NextResponse.json(phones);
  } catch (error) {
    console.error("Erro ao buscar dados da tabela rp_phones:", error)
    return NextResponse.json(
      { message: "Erro ao buscar dados", success: false },
      { status: 500 }
    )
  }
}
