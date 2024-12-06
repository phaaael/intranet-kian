import React from "react"
import PhoneDashboard from "./phone-dashboard"
import PhoneShortcuts from "./phone-shortcuts"

export default function ListPhone() {
  return (
    <div className="flex space-x-4 p-6 text-black">
      <div className="w-[700px] border-2 border-slate-200 p-4">
        <h1 className="text-xl font-bold mb-4">Dashboard de Ramais</h1>
        <PhoneDashboard rowsPerPage={10} />
      </div>

      <PhoneShortcuts />
    </div>
  )
}
