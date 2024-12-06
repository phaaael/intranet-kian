import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import findUserByCredencials from "@/lib/user"

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }

        try {
          const user = await findUserByCredencials(
            credentials.email as string,
            credentials.password as string
          )

          if (user) {
            return user
          } else {
            return null
          }
        } catch (error) {
          console.error("Erro durante a autenticação:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      return !!user
    }
  }
})
