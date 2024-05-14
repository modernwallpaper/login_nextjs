import { db } from "@/lib/db"

export const getVerifiactionTokenByToken = async (token:string) => {
  try {
    const verificationToken = await db.verficationToken.findUnique({ where: { token } })
    return verificationToken
  } catch {
    return null
  }
}

export const getVerifiactionTokenByEmail = async (email:string) => {
  try {
    const verificationToken = await db.verficationToken.findFirst({ where: { email } })
    return verificationToken
  } catch {
    return null
  }
}
