"use server"
import { currentRole } from "@/data/current-user"
import { getUserByEmail } from "@/data/user"
import { UpdateUserSchema, createUserSchema } from "@/schemas"
import { UserRole } from "@prisma/client"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { logout } from "./logout"
import { useRouter } from "next/navigation"

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

export const updateUserAsAdmin = async (values: z.infer<typeof UpdateUserSchema>) => {
  const role_session = await currentRole()
  if(role_session === UserRole.USER) return { error: "You are not allowed to update a user as admin" }

  const fields = UpdateUserSchema.safeParse(values)
  if(!fields.success) return { error: "Invalid fields" }

  const { name, email, password, role, id } = fields.data

  const hashedPassword = await bcrypt.hash(password, 12)
  await db.user.update({ 
    where: { id: id },
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    },
  })

  return { success: "User updated successfully" }
}

export const updateUserAsUser = async (values: z.infer<typeof UpdateUserSchema>) => {
  const fields = UpdateUserSchema.safeParse(values)
  if(!fields.success) return { error: "Invalid fields" }

  const { name, email, password, role, id } = fields.data

  const hashedPassword = await bcrypt.hash(password, 12)
  await db.user.update({ 
    where: { id: id },
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    },
  })
  
  logout()
}

export const deleteUserAsAdmin = async(id: string) => {

  const role_session = await currentRole()
  if(role_session === UserRole.USER) return { error: "You are not allowd to delete a user" }

  await db.user.delete({ where: { id, } })


  return { success: "User has been deleted successfully" }
}

export const getAllUsers = async() => {
  const role_session = await currentRole()
  if(role_session === UserRole.USER) return { error: "You are not allowed to get the users" }
  try { 
    const users = await db.user.findMany()
    return users
  } catch(error) {
    return null
  }
}

