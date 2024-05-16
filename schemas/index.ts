import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1)
})

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6)
})

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN"]),
})
