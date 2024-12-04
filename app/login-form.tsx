'use client'

import Form from "next/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import loginAction from "./loginAction"
import { useActionState } from "react"

export default function LoginForm() {

    const [ state, formAction, isPending ] = useActionState(loginAction, null)

    return (
        <>
            {state?.sucess === false && (
                <div className='text-xs bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                    <span className='block sm:inline'>{state?.message}</span>
                </div>
            )}
            <Form action={formAction}>
                <div>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="eu@exemplo.com" />
                </div>
                <div>
                    <Label>Senha</Label>
                    <Input type="password" name="password" placeholder="********" />
                </div>
                <div>
                    <Button className="w-full mt-6" type="submit">
                    Entrar
                    </Button>
                </div>
            </Form>
        </>
    )
}