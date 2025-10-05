"use client"

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function HomeDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (src: string) => {
    setSelectedImage(src);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <div className="max-w-max max-h-max mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center px-4 py-3">
        <img
          className="h-10 w-10 rounded-full"
          src="/kian-icon.png"
          alt="Avatar do usuário"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            Comunicação Coorporativa
          </p>
        </div>
      </div>

      <div className="relative cursor-pointer" onClick={() => openModal("/dica-do-dia.jpg")}>
        <img
          className="w-full h-64 object-cover"
          src="/dica-do-dia.jpg"
          alt="Imagem do Post"
        />
        <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
          Clique para ver maior
        </p>
      </div>

      <div className="px-4 py-2">
        <p className="text-sm text-gray-800">
          Semana da Segurança da Informação
        </p>
      </div>

      {isOpen && (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg bg-white relative">
              <img
                src={selectedImage || ""}
                alt="Imagem Ampliada"
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
  );
}
