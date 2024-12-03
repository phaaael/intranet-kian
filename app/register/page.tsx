import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '../../components/ui/card';
  import Link from 'next/link';
  import RegisterForm from './register-form';
  
  export default async function RegisterPage() {
    return (
      <>
        <main className="h-screen flex w-full">
            <div className="bg-primary-foreground w-full h-full flex p-16">
                <img className="w-full" src="/signin.svg" alt="" />
            </div>
          <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
            <Card className="w-96">
                <CardHeader className="items-center justify-center">
                    <CardTitle className="text-2xl font-bold tracking-tighter">
                        Cadastre-se
                    </CardTitle>
                    <CardDescription>
                        Faça seu cadastro agora mesmo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <div className="items-center justify-center">
                    <p className="text-sm text-muted-foreground mt-3 items-center justify-center">
                        Já possui cadastro?{' '}
                    <Link className="text-gray-800 hover:underline" href="/">
                        Faça o login
                    </Link>
                      .
                    </p>
                </div>
            </Card>
          </section>
        </main>
      </>
    );
  }
  