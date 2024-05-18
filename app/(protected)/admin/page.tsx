"use client"
import { PageHeader } from "../_components/page-header"
import { RoleGate } from "../_components/role-gate"
import { UserRole } from "@prisma/client"
import { AdminDashboard } from "../_components/admin-dashboard"

export default function AdminPage() {
  return(
    <div>
      <PageHeader label="Admin"/>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <AdminDashboard />
      </RoleGate>
    </div>
  )
}
