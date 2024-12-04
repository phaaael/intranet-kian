import { useState } from "react"

export interface Employee {
  phone_extension: string
  employee: string
  sector: string
  walk: string
}

export interface UseEmployeesReturn {
  currentEmployees: Employee[]
  totalPages: number
  handleSearch: (term: string) => void
  handlePageChange: (page: number) => void
  currentPage: number
}

export function useEmployees(data: Employee[], rowsPerPage: number): UseEmployeesReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const getFilteredEmployees = () => {
    return data.filter(
      (employee) =>
        employee.phone_extension.includes(searchTerm) ||
        employee.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.walk.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredEmployees = getFilteredEmployees()
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage)

  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return {
    currentEmployees,
    totalPages,
    handleSearch,
    handlePageChange,
    currentPage
  }
}
