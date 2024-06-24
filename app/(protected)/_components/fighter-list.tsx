"use server"

import { getAllFighters } from "@/actions/user"
import { DataTable } from "./fighter-table/data-table"
import { columns } from "./fighter-table/columns"

export const FighterList = async () => {
  //Get all fighters 
  const fighters = await getAllFighters()

  //If no users found return info text
  if(!fighters) return <div>No users found.</div>

  //If there was an error fetching the users return the error
  if('error' in fighters) return <div>{fighters.error}</div>

  //Pass the users fetched users pbject into the DataTable component
  return(
    <DataTable columns={columns} data={fighters}></DataTable>
  )
}
