'use server'

import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect"

export default async function loginAction(_prevState: any, formData: FormData) {
    const entries = Array.from(formData.entries())
    const data = Object.fromEntries(entries) as {
        name: string
        email: string
        password: string
    }

    if(!data.email || !data.password) return { message: 'Preencha todos os campos!', sucess: false }

    try {
        await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            redirect: true,
            redirectTo: '/inicio'
        })

    } catch(e: any) {
        if(isRedirectError(e)) throw e
        
        if(e.type === 'CredentialsSignin') return { message: 'Dados de login incorretos.', sucess: false}

        return { message: 'Ops, algum erro aconteceu.', sucess: false }
    }
}