import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import findUserByCredencials from "./lib/user"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [Credentials({
    credentials: {
        email: {},
        password: {}
    },

    authorize: async (credentials) => {
        const user = findUserByCredencials(credentials.email as string, credentials.password as string)

        return user
    }
  })],
})