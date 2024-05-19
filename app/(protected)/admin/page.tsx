import { PageHeader } from "../_components/page-header"
import { RoleGate } from "../_components/role-gate"
import { UserRole } from "@prisma/client"
import { AdminDashboard } from "../_components/admin-dashboard"
import { UserList } from "../_components/user-list"

export default async function AdminPage() {

  return(
    <div className="w-full h-full flex-col justify-center">
      <PageHeader label="Admin"/>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <div className="space-y-4">
          <UserList />
          <AdminDashboard />
        </div>
      </RoleGate>
    </div>
  )
}
