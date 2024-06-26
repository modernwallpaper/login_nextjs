import { UserRole } from "@prisma/client";
import { RoleGate } from "../../_components/role-gate";
import { UserList } from "../../_components/user-list";

export default function Page() {
  return(
    <div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <div className="space-y-4">
          <UserList />
        </div>
      </RoleGate>
    </div>
  )
}
