"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CircleUserRound } from "lucide-react"
import { useCurrentUser } from "@/hooks/use-current-session"
import { LogoutButton } from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export const UserButton = () => {
  const user = useCurrentUser()

  return(
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-neutral-200">
            <CircleUserRound /> 
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <Button asChild className="w-full" variant={"dropdown"}>
            <div className="flex items-center justify-center gap-x-2">
              <p>Logout</p>
              <LogOut className="h-4 w-4"/>
            </div>
          </Button>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
