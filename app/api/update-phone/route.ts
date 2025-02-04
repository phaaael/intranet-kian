import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserAdminPermission } from "@/lib/user";
import { updatePhoneInDatabase } from "@/lib/phone"; // Supondo que esta função interaja com o banco de dados

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const isAdmin = await getUserAdminPermission(userEmail);

    if (!isAdmin) {
      return NextResponse.json({ message: "Permissão negada" }, { status: 403 });
    }

    const { id, updates } = await request.json();

    if (!id || !updates) {
      return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
    }

    const updatedPhone = await updatePhoneInDatabase(id, updates);

    return NextResponse.json(updatedPhone, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar o ramal:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
