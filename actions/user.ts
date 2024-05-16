"use server"
import { currentRole } from "@/data/current-user"
import { getUserByEmail } from "@/data/user"
import { createUserSchema } from "@/schemas"
import { UserRole } from "@prisma/client"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const createUser = async (values: z.infer<typeof createUserSchema>) => {
  const role_session = await currentRole()
  if(role_session === UserRole.USER) return { error: "You are not allowed to register a user" }
  
  const fields = createUserSchema.safeParse(values)
  if(!fields.success) return { error: "Invalid fields" } 

  const { name, email, password, role } = fields.data

  const existingUser = await getUserByEmail(email)
  if(existingUser) return { error: "Email already in use" }

  const hashedPassword = await bcrypt.hash(password, 12)

  await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      role: role, 
    }
  })

  return { success: "User created successfully" }
}
