"use client"

import React, { useState } from "react"
import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import { Button } from "@/components/ui/button"

const photosPerPage = 15

const photoFolders = [
  {
    name: "Dia das Crianças",
    photos: [
      { id: 1, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0309.jpg" },
      { id: 2, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0310.jpg" },
      { id: 3, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0313.jpg" },
      { id: 4, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0318.jpg" },
      { id: 5, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0330.jpg" },
      { id: 6, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0334.jpg" },
      { id: 7, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0332.jpg" },
      { id: 8, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0354.jpg" },
      { id: 9, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0447.jpg" },
      { id: 10, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0421.jpg" },
      { id: 11, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0385.jpg" },
      { id: 12, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0365.jpg" },
      { id: 13, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0318.jpg" },
      { id: 14, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0330.jpg" },
      { id: 15, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0334.jpg" },
      { id: 16, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0332.jpg" },
      { id: 17, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0354.jpg" },
      { id: 18, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0447.jpg" },
      { id: 19, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0421.jpg" },
      { id: 20, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0385.jpg" },
      { id: 21, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0365.jpg" },
      { id: 22, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0318.jpg" },
      { id: 23, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0330.jpg" },
      { id: 24, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0334.jpg" },
      { id: 25, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0332.jpg" },
      { id: 26, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0354.jpg" },
      { id: 27, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0447.jpg" },
      { id: 28, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0421.jpg" },
      { id: 29, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0385.jpg" },
      { id: 30, src: "http://i.kian.com.br/src/uploads/2024/10/IMG_0365.jpg" },
    ],
  },
  {
    name: "Ano 2023",
    photos: [
      { id: 13, src: "/foto01.jpg", alt: "Image 1" },
      { id: 14, src: "/foto02.jpg", alt: "Image 2" },
    ],
  },
]

export default function PhotoDashboard() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
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
  const totalPages = folder
    ? Math.ceil(folder.photos.length / photosPerPage)
    : 1

  const photosToShow =
    folder?.photos.slice(
      (currentPage - 1) * photosPerPage,
      currentPage * photosPerPage
    ) || []

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

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
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /> </svg>
          </button>
          <div className="grid grid-cols-5 gap-4">
            {photosToShow.map((photo) => (
              <div
                key={photo.id}
                className={clsx(
                  "cursor-pointer overflow-hidden rounded-lg shadow-md",
                  "hover:scale-105 transition-transform"
                )}
                onClick={() => openModal(photo.src)}
              >
                <img src={photo.src} className="h-35 w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition-colors"
            >
              Anterior
            </ Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition-colors"
            >
              Próximo
            </Button>
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
                className="absolute top-4 right-4 p-2"
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
