"use client"
import { PageHeader } from "../_components/page-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const navToUsers = () => {
    router.push("/admin/users")
  }

  const navToFighters = () => {
    router.push("/admin/fighters")
  }

  return(
    <div className="w-full h-full flex-col justify-center">
      <PageHeader label="Admin"/>
      <div className="flex space-x-2">
        <Button variant={"nav_link"} onClick={navToUsers} className={pathname === "/admin/users" ? "text-primary" : "text-muted-foreground hover:text-primary"}> 
          Users  
        </Button>
        <Button variant={"nav_link"} onClick={navToFighters} className={pathname === "/admin/fighters" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          Fighters  
        </Button>
      </div>
      <Separator className="mb-2"/>
      <div>
        {children}
      </div>
    </div>
  )
}
