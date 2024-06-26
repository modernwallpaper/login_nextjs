import { UserRole } from "@prisma/client";
import { FighterList } from "../../_components/fighter-list";
import { RoleGate } from "../../_components/role-gate";

export default function Page() {
  return(
    <div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <div className="space-y-4">
          <FighterList />
        </div>
      </RoleGate>
    </div>
  )
}
