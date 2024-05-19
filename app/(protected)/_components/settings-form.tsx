import { getFighterDataById } from "@/data/user"
import { useCurrentUser } from "@/hooks/use-current-session"
import { FighterDataSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"


export const SettingsForm = () => {
  const user = useCurrentUser()
  const defaultValuesFighter = getFighterDataById(user?.id)

  const form = useForm<z.infer<typeof FighterDataSchema>>({
    resolver: zodResolver(FighterDataSchema),
    defaultValues: defaultValuesFighter  
  }) 

  return(
    <div>
      <p>Settings Form!</p>
      <p>{JSON.stringify(user)}</p>
      <p>{JSON.stringify(defaultValuesFighter)}</p>
    </div>
  )
}
