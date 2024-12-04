'use server'

import { redirect } from "next/navigation"
import { signOut } from "../../../auth"

export default async function logoutAction() { 
    signOut
    redirect('/')
}
