"use client"

import { useCurrentRole } from "@/hooks/use-current-role"
import { PageHeader } from "../_components/page-header"
import { RoleGate } from "../_components/role-gate"
import { FormSuccess } from "@/components/app/form-success"
import { UserRole } from "@prisma/client"

export default function AdminPage() {
  const role = useCurrentRole()

  return(
    <div>
      <PageHeader label="Admin"/>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="You are allowed to see this content"/>
      </RoleGate>
    </div>
  )
}
