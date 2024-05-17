"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "./user-button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export const Navbar = () => {
  const pathname = usePathname()

  return(
    <div className="backdrop-blur">
      <div className="border-b-2 flex justify-between items-center p-2 w-full backdrop-blur h-[60px] md:pr-20 md:pl-20">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant={"secondary"} size={"icon"}>
                <Menu className="h-4 w-4"/>
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetTitle>Menu</SheetTitle>
              <div className="flex-row gap-y-2 items-center">
                <ul>
                  <li>
                    <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                      <Link href={"/admin"}>Admin</Link>
                    </Button> 
                  </li>
                  <li>
                    <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                      <Link href={"/analysis"}>Analysis</Link>
                    </Button> 
                  </li>
                  <li>
                    <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                      <Link href={"/events"}>Events</Link>
                    </Button> 
                  </li>
                  <li>
                    <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                      <Link href={"/competitions"}>Competitions</Link>
                    </Button> 
                  </li>
                  <li>
                    <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                      <Link href={"/scorecard"}>Scorecard</Link>
                    </Button> 
                  </li>
                  <li>
                    <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                      <Link href={"/training"}>Training</Link>
                    </Button> 
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex gap-x-2 items-center">
          <Button asChild variant={"nav_link"} className={pathname === "/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
            <Link href={"/admin"}>Admin</Link>
          </Button> 
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
        </div>
        <UserButton />
      </div>
    </div>
  )
}
