import React from "react";
import PhoneDashboard from "./phone-dashboard";

export default function ListPhone() {
  return (
    <div className="w-[700px] p-6 bg-neutral-900 text-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Dashboard de Ramais</h1>
      <PhoneDashboard rowsPerPage={10} />
    </div>
  );
}
