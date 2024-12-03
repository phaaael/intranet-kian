import { redirect } from 'next/navigation';
import Navbar from './navbar';
import { auth } from '../../auth';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  const userName = session?.user?.name

  if(!session) return redirect('/')

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={userName || 'Usuário Desconhecido'} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
