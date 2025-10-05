'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { User, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Form from 'next/form'
import logoutAction from './(logout)/logoutAction'
import { useEffect, useState } from 'react'

export default function Navbar({ userName }: { userName: string }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
      const fetchPermissions = async () => {
          try {
              const response = await fetch("/api/check-permissions")
              if (!response.ok) {
                  throw new Error("Erro ao verificar permissões")
              }
              const data = await response.json()
              setIsAdmin(data.isAdmin)
          } catch (error) {
              console.error("Erro ao verificar permissões:", error)
          } finally {
              setLoading(false)
          }
      }
      fetchPermissions()
  }, [])

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/inicio" className="text-gray-700 hover:text-gray-900">
            <img
              src="https://kian.com.br/wp-content/themes/kian-site/styles/images/kian-color.png"
              alt="Logo Kian"
              className="w-20"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/inicio">
            <Button variant="link" className={cn(pathname === '/inicio' ? 'underline' : '')}>Início</Button>
          </Link>
          <Link href="/requisicoes">
            <Button variant="link" className={cn(pathname === '/requisicoes' ? 'underline' : '')}>Requisições</Button>
          </Link>
          <Link href="/cardapio">
            <Button variant="link" className={cn(pathname === '/cardapio' ? 'underline' : '')}>Cardápio</Button>
          </Link>
          <Link href="/fotos">
            <Button variant="link" className={cn(pathname === '/fotos' ? 'underline' : '')}>Fotos</Button>
          </Link>
          <Link href="/ramais">
            <Button variant="link" className={cn(pathname === '/ramais' ? 'underline' : '')}>Ramais</Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-gray-900">
                <User size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="text-center font-light uppercase text-xs">
                {userName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Form action={logoutAction} className="text-center justify-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded !important">
                  <button>Desconectar-se</button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
