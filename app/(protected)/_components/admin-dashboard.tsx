import { CreateUserForm } from "./create-user-form"
import { CustomDialog } from "./dialog-custom"
import { RoleGate } from "./role-gate"

export const AdminDashboard = () => {
  return(
    <RoleGate allowedRole="ADMIN">
      <CustomDialog buttonLabel="Create user" variant="default">
        <CreateUserForm />
      </CustomDialog>
    </RoleGate>
  )
}
