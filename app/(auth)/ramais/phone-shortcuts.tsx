import React from "react"

export default function PhoneShortcuts() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative flex items-center">
        <p className="text-xl font-bold text-neutral-700 transform -rotate-90 origin-center">Atalhos:</p>
        <div className="border-2 border-slate-200 p-2 flex flex-col items-center">
          <div className="w-[250px] space-y-1">
            <div className="flex justify-between items-center border-b border-red-300 py-2">
              <span className="text-sm text-gray-700">Quem ligou:</span>
              <span className="bg-red-600 text-white px-4 py-1 text-sm font-bold">#67</span>
            </div>

            <div className="flex justify-between items-center border-b border-red-300 py-2">
              <span className="text-sm text-gray-700">Ver Nº do Ramal:</span>
              <span className="bg-red-600 text-white px-4 py-1 text-sm font-bold">*87*</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-700">Passar Ligações:</span>
              <span className="bg-red-600 text-white px-4 py-1 text-sm font-bold">Flash + Nº</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
