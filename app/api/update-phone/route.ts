import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getUserAdminPermission } from "@/lib/user"
import db from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await auth()
    const userEmail = session?.user?.email

    if (!userEmail) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const isAdmin = await getUserAdminPermission(userEmail)
    if (!isAdmin) {
      return NextResponse.json({ message: "Permissão negada" }, { status: 403 })
    }

    const body = await request.json()
    const { id, updates } = body

    if (!id || isNaN(Number(id)) || !updates || typeof updates !== "object") {
      return NextResponse.json({ message: "Dados inválidos" }, { status: 400 })
    }

    const numericId = Number(id)

    const updatedPhone = await db.rp_phones.update({
      where: { phoneID: numericId },
      data: updates,
    })

    return NextResponse.json(updatedPhone, { status: 200 })
  } catch (error) {
        console.error("Erro ao atualizar o ramal:", error)
        return NextResponse.json({ message: "Erro interno do servidor"}, { status: 500 })
  }
}
