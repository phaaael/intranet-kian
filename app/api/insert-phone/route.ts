import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getUserAdminPermission } from "@/lib/user"
import db from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await auth()
    const userEmail = session?.user?.email

    if (!userEmail) return NextResponse.json({ message: "Não autorizado" }, { status: 401 })

    const isAdmin = await getUserAdminPermission(userEmail)
    if (!isAdmin) return NextResponse.json({ message: "Permissão negada" }, { status: 403 })

    const body = await request.json()
    const { phone, employee, sector, walk } = body

    const insertedPhone = await db.rp_phones.create({
      data: {
        phone: phone,
        employee: employee,
        sector: sector,
        walk: walk
      }
    })

    return NextResponse.json(insertedPhone, { status: 200 })
  } catch (error) {
    console.error("Erro ao inserir ramal:", error)
    return NextResponse.json({ message: "Erro interno do servidor"}, { status: 500 })
  }
}
