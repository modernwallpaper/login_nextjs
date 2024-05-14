import { LogoutButton } from "@/actions/refresh"
import { auth } from "@/auth"

export default async function Settings() {
  const session = await auth()
  return (
    <div className="flex">
      SESSION: { JSON.stringify(session) }
      <LogoutButton />
    </div>
  )
}
