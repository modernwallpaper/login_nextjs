"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CustomDialog } from "../dialog-custom"
import { FighterGender } from "@prisma/client"
import { UpdateFighterForm } from "../update-fighter-form"

export type Fighter = {
  id: string
  weight: string
  gender: FighterGender 
  weight_class: string
  age: string
  kup: string
}

export const columns: ColumnDef<Fighter>[] = [
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
    accessorKey: 'weight',
    header: 'Weight'
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'weight_class',
    header: 'Weight class',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'kup',
    header: 'Kup'
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const fighter = row.original

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
            <ul>
              <li>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <CustomDialog buttonLabel="Update fighter" variant="ghost">
                    <UpdateFighterForm id={fighter.id} weight={fighter.weight} gender={fighter.gender} 
                      weight_class={fighter.weight_class} age={fighter.age} kup={fighter.kup} />
                  </CustomDialog>
                </DropdownMenuItem>
              </li>
              <li>
                <DropdownMenuItem asChild className="cursor-pointer">
                </DropdownMenuItem>
              </li>
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },

  }
]
