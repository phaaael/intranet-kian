import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    const phones = await db.$queryRaw`
      SELECT phone, employee, sector, walk 
      FROM rp_phones 
      ORDER BY 
          CASE 
          WHEN walk = 'Apoio' THEN 1
              WHEN walk = 'Terreo' THEN 2
          WHEN walk = '1º' THEN 3
              WHEN walk = '2º' THEN 4
              WHEN walk = '3º' THEN 5
              WHEN walk = '-' THEN 6
              ELSE 7
          END;
    `

    return NextResponse.json(phones)
  } catch (error) {
    console.error("Erro ao buscar dados da tabela rp_phones:", error)
    return NextResponse.json({ message: "Erro ao buscar dados", success: false }, { status: 500 })
  }
}
