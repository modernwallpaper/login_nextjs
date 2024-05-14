import { getVerifiactionTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"

export const generateVerificationToken = async(email:string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000)
  const existingToken = await getVerifiactionTokenByEmail(email)
  
  if(existingToken) await db.verficationToken.delete({ where: { id: existingToken.id } })

  const verficationToken = await db.verficationToken.create({ data: { email, token, expires } })

  return verficationToken
}
