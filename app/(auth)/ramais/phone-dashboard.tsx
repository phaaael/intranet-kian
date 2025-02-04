"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { findPhones, updatePhone } from "@/lib/phone";

const useCheckPermissions = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const response = await fetch("/api/check-permissions");
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Erro ao verificar permissões:", error);
      }
    };

    checkPermissions();
  }, []);

  return isAdmin;
};

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
  const [editMode, setEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<{ id: string; field: keyof Employee; value: string } | null>(null);
  const isAdmin = useCheckPermissions();

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

  const translateFieldName = (field: keyof Employee) => {
    const translations: Record<keyof Employee, string> = {
      phone: "ramal",
      employee: "funcionário",
      sector: "setor",
      walk: "andar",
    };
    return translations[field] || field;
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDialogOpen = (id: string, field: keyof Employee, value: string) => {
    if (editMode && isAdmin) {
      setCurrentEdit({ id, field, value });
      setDialogOpen(true);
    }
  };

  const handleDialogSave = async () => {
    if (currentEdit) {
      await updatePhone(currentEdit.id, { [currentEdit.field]: currentEdit.value });
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.phone === currentEdit.id ? { ...emp, [currentEdit.field]: currentEdit.value } : emp
        )
      );
      setDialogOpen(false);
    }
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
      {isAdmin && (
        <Button
          onClick={() => setEditMode(!editMode)}
          className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          {editMode ? "Desabilitar Edição" : "Habilitar Edição"}
        </Button>
      )}

      <Input
        type="text"
        placeholder="Consulte..."
        className="mb-4 bg-neutral-200 border border-gray-300 rounded-lg p-2"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-red-300">
              <TableHead className="w-[100px]">Ramal</TableHead>
              <TableHead>Funcionário</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead className="text-right">Andar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <TableRow key={index} className="border-red-300">
                  {Object.entries(employee).map(([key, value]) => (
                    <TableCell
                      key={key}
                      onClick={() => handleDialogOpen(employee.phone, key as keyof Employee, value)}
                      className={editMode && isAdmin ? "cursor-pointer hover:bg-gray-100" : ""}
                    >
                      {value}
                    </TableCell>
                  ))}
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

      {currentEdit && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar {translateFieldName(currentEdit.field)}</DialogTitle>
            </DialogHeader>
            <Input
              value={currentEdit.value}
              onChange={(e) =>
                setCurrentEdit((prev) =>
                  prev ? { ...prev, value: e.target.value } : prev
                )
              }
            />
            <DialogFooter>
              <Button onClick={handleDialogSave}>Salvar</Button>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
