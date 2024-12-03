import { compareSync } from 'bcrypt-ts'
import db from './db'

type User = {
    name: string
    email: string
    password?: string
}

export default  async function findUserByCredencials(email: string, password: string): Promise<User | null> {
    const user = await db.rp_users.findFirst({ where: { email: email } })

    if (!user || !user.password || !user.name) return null

    const passwordMatch = compareSync(password, user.password)

    if(passwordMatch) return { email: user.email, name: user.name}

    return null
}