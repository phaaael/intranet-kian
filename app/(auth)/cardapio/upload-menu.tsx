"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"

export default function UploadMenu({ onUploadComplete }: { onUploadComplete: () => void }) {
    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/upload-menu", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                setFile(null)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }
                onUploadComplete()
            }
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error)
        }
    }

    return (
        <div className="flex justify-center items-center p-8">
            <div className="border-2 border-slate-200 p-4 gap-2">
                <p className="text-sm font-bold mb-4">Atualização do Cardápio</p>
                <Input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    className="w-full cursor-pointer mb-2"
                />
                <Button
                    onClick={handleUpload}
                    disabled={!file}
                    className="w-full disabled:opacity-50"
                >
                    Enviar Cardápio
                </Button>
            </div>
        </div>
    )
}