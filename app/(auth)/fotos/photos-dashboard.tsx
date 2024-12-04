"use client"

import React, { useState } from "react"
import { Dialog } from "@headlessui/react"
import clsx from "clsx"

const photoFolders = [
  {
    name: "Ano 2022",
    photos: [
      { id: 1, src: "/foto01.jpg", alt: "Image 1" },
      { id: 2, src: "/foto02.jpg", alt: "Image 2" },
    ],
  },
  {
    name: "Ano 2023",
    photos: [
      { id: 3, src: "/foto01.jpg", alt: "Image 1" },
      { id: 4, src: "/foto02.jpg", alt: "Image 2" },
    ],
  },
]

export default function PhotoDashboard() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openModal = (src: string) => {
    setSelectedImage(src)
    setIsOpen(true)
  }

  const closeModal = () => {
    setSelectedImage(null)
    setIsOpen(false)
  }

  const folder = photoFolders.find((f) => f.name === selectedFolder)

  return (
    <div className="p-4">
      {selectedFolder === null ? (
        <div className="grid grid-cols-2 gap-4">
          {photoFolders.map((folder) => (
            <div
              key={folder.name}
              className={clsx(
                "cursor-pointer p-4 border rounded-lg shadow-md text-center",
                "hover:bg-gray-100 hover:scale-105 transition-transform"
              )}
              onClick={() => setSelectedFolder(folder.name)}
            >
              <h2 className="font-semibold">{folder.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedFolder(null)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Voltar
          </button>
          <div className="grid grid-cols-3 gap-4">
            {folder?.photos.map((photo) => (
              <div
                key={photo.id}
                className={clsx(
                  "cursor-pointer overflow-hidden rounded-lg shadow-md",
                  "hover:scale-105 transition-transform"
                )}
                onClick={() => openModal(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-40 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg bg-white">
              <img
                src={selectedImage || ""}
                alt="Selected"
                className="w-full object-contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
              >
                ❌
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  )
}
