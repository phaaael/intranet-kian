"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { findPhones, updatePhone, insertPhone } from "@/lib/phone"

const useCheckPermissions = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const response = await fetch("/api/check-permissions")
        const data = await response.json()
        setIsAdmin(data.isAdmin)
      } catch (error) {
        console.error("Erro ao verificar permissões:", error)
      }
    }

    checkPermissions()
  }, [])

  return isAdmin
}

type Employee = {
  phoneID: number
  phone: string
  employee: string
  sector: string
  walk: string
}

type PhoneDashboardProps = {
  rowsPerPage: number
}

export default function PhoneDashboard({ rowsPerPage }: PhoneDashboardProps) {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [currentEmployees, setCurrentEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [editMode, setEditMode] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [includeDialogOpen, setIncludeDialogOpen] = useState(false)
  const [newRecord, setNewRecord] = useState<Employee>({ phoneID: 0, phone: '', employee: '', sector: '', walk: '' })
  const [currentEdit, setCurrentEdit] = useState<{ id: string; field: keyof Employee; value: string } | null>(null)
  const isAdmin = useCheckPermissions()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await findPhones()
        const formattedData = data.map((item: any, index: number) => ({
          phoneID: item.phoneID ?? index + 1,
          phone: item.phone,
          employee: item.employee,
          sector: item.sector,
          walk: item.walk,
        }))
        setEmployees(formattedData)
      } catch (error) {
        console.error("Erro ao buscar os dados dos ramais:", error)
      }
    }

    fetchEmployees()
  }, [])

  useEffect(() => {
    const filteredEmployees = employees.filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage

    setCurrentEmployees(filteredEmployees.slice(startIndex, endIndex))
  }, [employees, searchTerm, currentPage, rowsPerPage])

  const translateFieldName = (field: keyof Employee) => {
    const translations: Record<keyof Employee, string> = {
      phone: "Ramal",
      employee: "Funcionário",
      sector: "Setor",
      walk: "Andar",
      phoneID: "ID"
    }
    return translations[field] || field
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDialogOpen = (id: number | string, field: keyof Employee, value: string) => {
    if (editMode && isAdmin) {
      setCurrentEdit({ id: String(id), field, value })
      setDialogOpen(true)
    }
  }

  const handleDialogSave = async () => {
    if (currentEdit) {
      try {
        await updatePhone(parseInt(currentEdit.id), { [currentEdit.field]: currentEdit.value })
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.phoneID.toString() === currentEdit.id ? { ...emp, [currentEdit.field]: currentEdit.value } : emp
          )
        )
        setDialogOpen(false)
      } catch (error) {
        console.error("Erro ao atualizar o ramal:", error)
      }
    }
  }
  
  const handleIncludeSave = async () => {
    try {
      if (!newRecord.phone?.trim()) {
        toast({
          variant: "destructive",
          title: "Ramal obrigatório",
          description: "Por favor, preencha o campo de telefone antes de salvar.",
        })
        return
      }
  
      if (!newRecord.employee?.trim()) {
        toast({
          variant: "destructive",
          title: "Funcionário obrigatório",
          description: "Por favor, informe o nome do funcionário.",
        })
        return
      }
  
      if (!newRecord.sector?.trim()) {
        toast({
          variant: "destructive",
          title: "Setor obrigatório",
          description: "O campo setor precisa ser preenchido.",
        })
        return
      }
  
      if (!newRecord.walk?.trim()) {
        toast({
          variant: "destructive",
          title: "Andar obrigatório",
          description: "Indique em qual andar o ramal se encontra.",
        })
        return
      }
      
      await insertPhone( newRecord.phone, newRecord.employee, newRecord.sector, newRecord.walk )
      const data = await findPhones()
      const formattedData = data.map((item: any, index: number) => ({
        phoneID: item.phoneID ?? index + 1,
        phone: item.phone,
        employee: item.employee,
        sector: item.sector,
        walk: item.walk
      }))
      
      setEmployees(formattedData)
      setIncludeDialogOpen(false)
    } catch(error) {
      console.error("Erro ao incluir registro", error)
    }
  }

  const totalPages = Math.ceil(
    employees.filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ).length / rowsPerPage
  )

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

      {isAdmin && (
        <Button
        onClick={() => setIncludeDialogOpen(true)}
          className="mb-4 m-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
        { "Incluir Registro" }
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
              <TableHead>Andar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <TableRow key={index} className="border-red-300">
                  {Object.entries(employee).map(([key, value]) => (
                    key !== "phoneID" && (
                      <TableCell
                        key={key}
                        onClick={() => handleDialogOpen(employee.phoneID, key as keyof Employee, String(value))}
                        className={editMode && isAdmin ? "cursor-pointer hover:bg-gray-100" : ""}
                      >
                        {value}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">"
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
              <Button className="bg-red-600 rounded hover:bg-red-500 transition-colors" onClick={handleDialogSave}>Salvar</Button>
              <Button className="bg-neutral-200 rounded hover:bg-neutral-300 transition-colors" variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {isAdmin && (
        <Dialog open={includeDialogOpen} onOpenChange={setIncludeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Incluir Novo Registro</DialogTitle>
            </DialogHeader>
            <Input placeholder="Ramal" value={newRecord.phone} onChange={(e) => setNewRecord(prev => ({ ...prev, phone: e.target.value }))} />
            <Input placeholder="Funcionário" value={newRecord.employee} onChange={(e) => setNewRecord(prev => ({ ...prev, employee: e.target.value }))} />
            <Input placeholder="Setor" value={newRecord.sector} onChange={(e) => setNewRecord(prev => ({ ...prev, sector: e.target.value }))} />
            <Input placeholder="Andar" value={newRecord.walk} onChange={(e) => setNewRecord(prev => ({ ...prev, walk: e.target.value }))} />
            <DialogFooter>
              <Button className="bg-red-600 rounded hover:bg-red-500 transition-colors" onClick={handleIncludeSave}>Salvar</Button>
              <Button className="bg-neutral-200 rounded hover:bg-neutral-300 transition-colors" variant="secondary" onClick={() => setIncludeDialogOpen(false)}>Cancelar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
