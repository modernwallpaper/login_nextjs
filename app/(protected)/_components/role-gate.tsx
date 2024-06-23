"use client"

import { FormError } from "@/components/app/form-error";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface Props {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: Props) => {
  //Get the role from the currently logged in user
  const role = useCurrentRole()

  //When the current role doesent match the given Role then hide the page content
  if(role !== allowedRole) {
    return <FormError message="You do not have permission to view this content"></FormError>
  }

  //Otherwise return the content
  return(
   <>{children}</>
  )
}
