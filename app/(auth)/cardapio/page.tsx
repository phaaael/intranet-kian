"use client"

import { useState, useEffect } from "react"
import DashboardMenu from "./menu"
import UploadMenu from "./upload-menu"

export default function Page() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updateTrigger, setUpdateTrigger] = useState(0)

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await fetch("/api/check-permissions")
                if (!response.ok) {
                    throw new Error("Erro ao verificar permissões")
                }
                const data = await response.json()
                setIsAdmin(data.isAdmin)
            } catch (error) {
                console.error("Erro ao verificar permissões:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPermissions()
    }, [])

    const handleMenuUpdate = () => {
        setUpdateTrigger((prev) => prev + 1)
    }
    
    if (loading) return <div className="w-8 h-8 border-4 border-gray-300 border-t-4 border-t-neutral-500 rounded-full animate-spin" />

    return (
        <div className="flex space-x-4 p-6 text-black">
            <div className="w-[700px] p-4">
                <h1 className="text-xl font-bold mb-4">Cardápio da Semana</h1>
                <DashboardMenu updateTrigger={updateTrigger} />
            </div>

            {isAdmin && <UploadMenu onUploadComplete={handleMenuUpdate} />}
        </div>
    )
}
