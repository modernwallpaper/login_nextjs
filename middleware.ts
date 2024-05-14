import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const loggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isApiAuthRoute) return;

  if(isAuthRoute) {
    if(loggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    return
  } 

  if(!loggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
