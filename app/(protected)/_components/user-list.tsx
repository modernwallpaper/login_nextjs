"use server"

import { getAllUsers } from "@/actions/user"
import { DataTable } from "./user-table/data-table"
import { columns } from "./user-table/columns"

export const UserList = async () => {
  const users = await getAllUsers()

  return(
    <DataTable columns={columns} data={users}></DataTable>
  )
}
