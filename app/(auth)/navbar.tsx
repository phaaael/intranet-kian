'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Form from 'next/form';
import logoutAction from './(logout)/logoutAction'

export default function Navbar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/inicio" className="text-gray-700 hover:text-gray-900">
            <img src="https://kian.com.br/wp-content/themes/kian-site/styles/images/kian-color.png" alt="Logo Kian" className='w-20'/>
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/inicio" className="text-gray-700 hover:text-gray-900">
            <Button variant={'link'} className={cn( pathname === '/inicio' ? 'underline' : '' )} >Início</Button>
          </Link>

          <Link href="#" className="text-gray-700 hover:text-gray-900">
            <Button variant={'link'} className={cn( pathname === '#' ? 'underline' : '' )} >Requisições</Button>
          </Link>

          <Link href="/cardapio" className="text-gray-700 hover:text-gray-900">
            <Button variant={'link'} className={cn( pathname === '/cardapio' ? 'underline' : '' )} >Cardápio</Button>
          </Link>

          <Link href="/fotos" className="text-gray-700 hover:text-gray-900">
            <Button variant={'link'} className={cn( pathname === '/fotos' ? 'underline' : '' )} >Fotos</Button>
          </Link>

          <Link href="/listagem-de-ramais" className="text-gray-700 hover:text-gray-900">
            <Button variant={'link'} className={cn( pathname === '/listagem-de-ramais' ? 'underline' : '' )} >Ramais</Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-gray-900">
                <User size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="font-light uppercase text-xs">
                {userName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Form action={logoutAction}>
                  <button>Logout</button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
