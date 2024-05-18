"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CustomDialog } from "../dialog-custom"
import { UpdateUserForm } from "../update-user-form"

export type User = {
  id: string
  name: string
  password: string
  role: "USER" | "ADMIN"
  email: string
  emailVerified: Date | null
  image: string | null;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return(
        <Button 
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc" )}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'password',
    header: 'Password',
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4"/> 
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild className="cursor-pointer">
              <CustomDialog buttonLabel="Update user" variant="ghost">
                <UpdateUserForm email={user.email} name={user.name} role={user.role} id={user.id}/>   
              </CustomDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },

  }
]
