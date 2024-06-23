"use server"
import { db } from "@/lib/db"

export const getUserByEmail = async (email: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { email } })
    return user
  } catch(error) {
    return null
  }
}

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    return user
  } catch(error) {
    return null
  }
}

export const getFighterDataById = async (id: string | undefined) => {
  try {
    console.log(`Getting fighter data for id: ${id}`)
    const data = await db.figherData.findUnique({ where: { id } })
    console.log(`Data received: ${JSON.stringify(data)}`)
    return data
  } catch (error) {
    console.error(`Error fetching data: ${error}`)
    return null
  }
}
