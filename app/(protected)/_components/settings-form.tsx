import { createFighterData } from "@/actions/fighter"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { getFighterDataById } from "@/data/user"
import { useCurrentUser } from "@/hooks/use-current-session"
import { FighterDataSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FigherData } from "@prisma/client"
import * as z from "zod"

export const SettingsForm = () => {
  const user = useCurrentUser()
  const { toast } = useToast()

  const [fighter, setFighter] = useState<FigherData>()

  useEffect(() => {
    if (user?.id) {
      getFighterDataById(user.id).then(data => setFighter(data))
    }
  }, [user?.id])

  const form = useForm<z.infer<typeof FighterDataSchema>>({
    resolver: zodResolver(FighterDataSchema),
  })

  const submitFighterData = (values: z.infer<typeof FighterDataSchema>) => {
    startTransition(() => {
      createFighterData(values, user?.id).then((data) => {
        if(data.error) toast({ title: data.error })
        toast({ title: data.success })
      })
    })  
  }

  const onClick = () => {
    console.log(fighter)
  }

  return(
    <div className="w-[350px]">
    <Button onClick={onClick}>
      Show Data
    </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitFighterData)} className="space-y-6">
          <div className="space-y-2">
            <FormField 
              control={form.control}
              name="weight"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="kg"/>
                  </FormControl>
                </FormItem>
              )}
            />  
            <FormField 
              control={form.control}
              name="age"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="age"/>
                  </FormControl>
                </FormItem>
              )}
            />  
            <FormField 
              control={form.control}
              name="gender"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />  
            <FormField 
              control={form.control}
              name="weight_class"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Weight Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select weight class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="-45">until 45</SelectItem>
                      <SelectItem value="-48">until 48</SelectItem>
                      <SelectItem value="-51">until 51</SelectItem>
                      <SelectItem value="-55">until 55</SelectItem>
                      <SelectItem value="-59">until 59</SelectItem>
                      <SelectItem value="-63">until 63</SelectItem>
                      <SelectItem value="-68">until 68</SelectItem>
                      <SelectItem value="-73">until 73</SelectItem>
                      <SelectItem value="+73">over 73</SelectItem>
                      <SelectItem value="-78">until 78</SelectItem>
                      <SelectItem value="+78">over 78</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />  
            <FormField 
              control={form.control}
              name="kup"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Kup</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a kup"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1st Kup</SelectItem>
                      <SelectItem value="2">2nd Kup</SelectItem>
                      <SelectItem value="3">3rd Kup</SelectItem>
                      <SelectItem value="4">4th Kup</SelectItem>
                      <SelectItem value="5">5th Kup</SelectItem>
                      <SelectItem value="6">6th Kup</SelectItem>
                      <SelectItem value="7">7th Kup</SelectItem>
                      <SelectItem value="8">8th Kup</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />  
          </div>
          <Button className="w-full" type="submit">
            Update data
          </Button>
        </form>
      </Form>
    </div>
  )
}
