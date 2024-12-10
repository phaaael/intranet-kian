import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getUserAdminPermission } from "@/lib/user"

export async function GET() {
    try {
        const session = await auth()
        const userEmail = session?.user?.email

        if (!userEmail) {
            return NextResponse.json({ isAdmin: false }, { status: 401 })
        }

        const isAdmin = await getUserAdminPermission(userEmail)
        return NextResponse.json({ isAdmin })
    } catch (error) {
        return NextResponse.json({ isAdmin: false }, { status: 500 })
    }
}
