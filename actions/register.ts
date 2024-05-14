"use server"
import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"


export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if(!validatedFields.success) return { error: "Invalid fields" }

  // Get fields and hash password
  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 12)

  // Check for existing User
  const existingUser = await getUserByEmail(email)

  if(existingUser) return { error: "Email already in use" }

  // Create User
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  return { success: "Verification email sent" }
}

