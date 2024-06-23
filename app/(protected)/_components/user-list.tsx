"use server"

import { getAllUsers } from "@/actions/user"
import { DataTable } from "./user-table/data-table"
import { columns } from "./user-table/columns"

export const UserList = async () => {
  //Get all users
  const users = await getAllUsers()

  //If no users found return info text
  if(!users) return <div>No users found.</div>

  //If there was an error fetching the users return the error
  if('error' in users) return <div>{users.error}</div>

  //Pass the users fetched users pbject into the DataTable component
  return(
    <DataTable columns={columns} data={users}></DataTable>
  )
}
