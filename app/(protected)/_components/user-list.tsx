"use server"

import { getAllUsers } from "@/actions/user"
import { DataTable } from "./user-table/data-table"
import { User, columns } from "./user-table/columns"

export const UserList = async () => {
  const users = await getAllUsers()

  if(!users) return <div>No users found.</div>

  if('error' in users) return <div>{users.error}</div>

  return(
    <DataTable columns={columns} data={users}></DataTable>
  )
}
