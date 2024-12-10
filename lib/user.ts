import { compareSync } from 'bcrypt-ts'
import db from './db'

type User = {
    name: string
    email: string
    password?: string
}

export async function findUserByCredencials(email: string, password: string): Promise<User | null> {
    const user = await db.rp_users.findFirst({ where: { email: email } })

    if (!user || !user.password || !user.name) return null

    const passwordMatch = compareSync(password, user.password)

    if(passwordMatch) return { email: user.email, name: user.name}

    return null
}

export const getUserAdminPermission = async (email: string): Promise<boolean> => {
    try {
        if (!email) throw new Error("Email não fornecido.");

        const user = await db.rp_users.findFirst({
            where: { email },
            select: { role: true }
        });

        return user?.role === "administrador";
    } catch (error) {
        console.error("Erro ao consultar permissões do usuário:", error);
        return false
    }
}