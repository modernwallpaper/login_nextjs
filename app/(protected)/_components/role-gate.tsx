"use client"

import { FormError } from "@/components/app/form-error";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface Props {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: Props) => {
  const role = useCurrentRole()

  if(role !== allowedRole) {
    return <FormError message="You do not have permission to view this content"></FormError>
  }

  return(
   <>{children}</>
  )
}
