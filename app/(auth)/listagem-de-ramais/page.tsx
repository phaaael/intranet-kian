import React from "react"
import PhoneDashboard from "./phone-dashboard"

export default function ListPhone() {
  return (
    <div className="w-[700px] p-6 text-black rounded-lg">
      <h1 className="text-xl font-bold mb-4">Dashboard de Ramais</h1>
        <PhoneDashboard rowsPerPage={10} />
    </div>
  )
}
