"use client"
import { PageHeader } from "../_components/page-header"
import { RoleGate } from "../_components/role-gate"
import { FormSuccess } from "@/components/app/form-success"
import { UserRole } from "@prisma/client"
import { createUser } from "@/actions/user"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const { toast } = useToast()

  const onCreateUser = () => {
    createUser({ name: "", email: "", password: "", role: "USER" }).then((data) => {
      if(data.error) toast({ variant: "destructive", description: "You do not have the necessary rights" })
      if(data.success) toast({ variant: "default", description: "New user has been created" })
    })
  }

  return(
    <div>
      <PageHeader label="Admin"/>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="You are allowed to see this content"/>
      </RoleGate>
      <Button onClick={onCreateUser}>
        Create User
      </Button>
    </div>
  )
}
