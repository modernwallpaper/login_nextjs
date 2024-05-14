import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "./data/user"

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER"
    } & DefaultSession["user"]
  }
}

export const { auth, handlers:{ GET, POST }, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      console.log({ sessionToken: token })
  
      // Extend Session
      if(token.role && session.user) session.user.role = token.role
      if(token.sub && session.user) session.user.id = token.sub

      return session
    },

    async jwt({ token }) {
      if(!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if(!existingUser) return token

      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
