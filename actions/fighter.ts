"use server"

import { getFighterDataById } from "@/data/user"
import { db } from "@/lib/db"
import { FighterDataSchema } from "@/schemas"
import * as z from "zod"

export const createFighterData = async (values: z.infer<typeof FighterDataSchema>, userId: string) => {
  const validatedFields = FighterDataSchema.safeParse(values)
  if(!validatedFields.success) return { error: "Invalid fields" }

  const { weight, gender, kup, age, weight_class } = validatedFields.data

  const existingData = await getFighterDataById(userId)
  if(existingData) {
    await db.figherData.update({
      where: { id: userId },
      data: {
        weight: weight,
        gender: gender,
        weight_class: weight_class,
        kup: kup,
        age: age,
      }
    })

    return { success: "Data for figther updated successfully" }
  }

  await db.figherData.create({
    data: {
      weight: weight,
      gender: gender,
      weight_class: weight_class,
      kup: kup,
      age: age,
      user: {
        connect: { id: userId }
      }
    }
  })

  return { success: "Data for fighter created" }
}
