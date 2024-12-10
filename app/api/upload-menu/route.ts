import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

async function saveFile(file: File): Promise<void> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const filePath = path.join(process.cwd(), "public", "cardapio.jpg")

  await fs.promises.writeFile(filePath, buffer)
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type")
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Formato inválido. Envie um form-data com um arquivo." },
        { status: 400 }
      )
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { message: "Nenhum arquivo enviado." },
        { status: 400 }
      )
    }

    await saveFile(file)

    return NextResponse.json(
      { message: "Upload realizado com sucesso!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro no upload:", error)
    return NextResponse.json(
      { message: "Erro ao processar o upload." },
      { status: 500 }
    )
  }
}
