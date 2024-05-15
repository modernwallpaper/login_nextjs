"use client"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/use-current-session"

export default function Settings() {
  const onClick = () => {
     logout()
  }

  const user = useCurrentUser();
  
  return (
    <div className="">
      <Button onClick={onClick}>Logout</Button>
      {JSON.stringify(user)}
    </div>
  )
}
