"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "./user-button"

export const Navbar = () => {
  const pathname = usePathname()

  return(
    <div className="backdrop-blur">
      <div className="border-b-2 flex justify-between items-center p-2 w-full backdrop-blur h-[60px] pr-20 pl-20">
        <div className="flex gap-x-2 items-center">
          <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
            <Link href={"/analysis"}>Analysis</Link>
          </Button> 
          <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
            <Link href={"/events"}>Events</Link>
          </Button> 
          <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
            <Link href={"/competitions"}>Competitions</Link>
          </Button> 
          <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
            <Link href={"/scorecard"}>Scorecard</Link>
          </Button> 
          <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
            <Link href={"/training"}>Training</Link>
          </Button> 
          <Button asChild variant={"nav_link"} className={pathname === "/settings" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
            <Link href={"/settings"}>Settings</Link>
          </Button> 
        </div>
        <UserButton />
      </div>
    </div>
  )
}
