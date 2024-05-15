import { SessionProvider } from "next-auth/react"
import { Navbar } from "./_components/navbar"
import { auth } from "@/auth"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <main className="w-full h-full flex flex-col gap-y-3">
        <Navbar />
        <div className="p-2">{children}</div>
      </main>
    </SessionProvider>
  )
}
