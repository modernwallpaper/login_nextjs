"use client"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/use-current-session"
import { PageHeader } from "../_components/page-header"
import { SettingsForm } from "../_components/settings-form"

export default function Settings() {
  // const onClick = () => {
  //    logout()
  // }
  //
  // // const user = useCurrentUser();
  // // 
  return (
    <div className="w-full h-full">
      <PageHeader label="Settings"/>
      <SettingsForm />
      {/*<Button onClick={onClick}>Logout</Button>*/}
    </div>
  )
}
