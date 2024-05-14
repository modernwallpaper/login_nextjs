"use server"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerifiactionTokenByToken } from "@/data/verification-token"

export const newVerification = async(token:string) => {
  const existingToken = await getVerifiactionTokenByToken(token)

  if(!existingToken) return { error: "Link does not exist" }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if(hasExpired) return { error: "Link has expired" }

  const existingUser = await getUserByEmail(existingToken.email)

  if(!existingUser) return { error: "Email does not exist" }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingUser.email }
  })

  return { success: "Email verified successfully" }
}
