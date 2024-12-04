'use server';

import db from '../../lib/db';
import { hash } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export default async function registerAction(
    _prevState: unknown,
    formData: FormData
): Promise<{ message?: string; success: boolean } | void> {
    if (!db || !db.rp_users) {
        console.error("Prisma Client não inicializado corretamente:", db);
        return { message: "Erro interno no servidor", success: false };
    }

    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as unknown as RegisterFormData;

    if (!data.email || !data.name || !data.password) {
        return { message: 'Preencha todos os campos!', success: false };
    }

    const user = await db.rp_users.findUnique({
        where: { email: data.email },
    });

    if (user) {
        return { message: 'Este usuário já existe.', success: false };
    }

    const hashedPassword = await hash(data.password, 10);

    await db.rp_users.create({
        data: {
            email: data.email,
            name: data.name,
            password: hashedPassword,
        },
    });

    redirect('/');
}
