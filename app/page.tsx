import { Poppins } from "next/font/google"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
}) 

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold drop-shadow-md",
          font.className,
        )}>website</h1>
        <p>A test site for user authentication and management using react</p>
        <div>
          <LoginButton>
            <Button size={"lg"}>
              Login
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
