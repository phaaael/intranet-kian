"use client"

import { useState, useEffect } from "react"

export default function DashboardMenu({ updateTrigger }: { updateTrigger: number }) {
    const [imageSrc, setImageSrc] = useState("/cardapio.jpg")

    useEffect(() => {
        setImageSrc(`/cardapio.jpg?timestamp=${Date.now()}`)
    }, [updateTrigger])

    return (
        <img
            src={imageSrc}
            alt="Cardápio"
            className="w-full h-auto object-contain rounded-lg"
        />
    )
}