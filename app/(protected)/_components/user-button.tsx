"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CircleUserRound } from "lucide-react"
import { LogoutButton } from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

export const UserButton = () => {
  return(
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="">
            <CircleUserRound /> 
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <div className="flex-col">
          <Button asChild className="w-full mb-1" variant={"dropdown"}>
            <div className="flex items-center justify-center gap-x-2">
              <Link href={"/settings"}>Settings</Link>
            </div>
          </Button>
          <LogoutButton>
            <Button asChild className="w-full" variant={"dropdown"}>
              <div className="flex items-center justify-center gap-x-2">
                <p>Logout</p>
                <LogOut className="h-4 w-4"/>
              </div>
            </Button>
          </LogoutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
