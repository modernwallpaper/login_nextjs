"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export const BackButton = ({ href, label }: { href: string, label: string }) => {
  return(
    <Button variant={"link"} size={"sm"} className="font-normal w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
