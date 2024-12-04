"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { findPhones } from "@/lib/phone";

type Employee = {
  phone: string;
  employee: string;
  sector: string;
  walk: string;
};

type PhoneDashboardProps = {
  rowsPerPage: number;
};

export default function PhoneDashboard({ rowsPerPage }: PhoneDashboardProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentEmployees, setCurrentEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await findPhones();
        setEmployees(data);
      } catch (error) {
        console.error("Erro ao buscar os dados dos ramais:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filteredEmployees = employees.filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    setCurrentEmployees(filteredEmployees.slice(startIndex, endIndex));
  }, [employees, searchTerm, currentPage, rowsPerPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(
    employees.filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ).length / rowsPerPage
  );

  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <p className="text-sm text-gray-700">Atalhos:</p>
        <p className="text-sm">Quem ligou: #67</p>
        <p className="text-sm">Ver nº do ramal: *87*</p>
        <p className="text-sm">Passar ligações: flash + nº do ramal</p>
      </div>
      <Input
        type="text"
        placeholder="Consulte..."
        className="mb-4"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ramal</TableHead>
              <TableHead>Funcionário</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead className="text-right">Andar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.employee}</TableCell>
                  <TableCell>{employee.sector}</TableCell>
                  <TableCell className="text-right">{employee.walk}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition-colors"
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition-colors"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
