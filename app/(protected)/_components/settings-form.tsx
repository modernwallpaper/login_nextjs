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
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

//Define the fighter data to get rid of typing issues
type FighterData = {
  id: string
  weight: string
  gender: "MALE" | "FEMALE"
  weight_class: string
  kup: string
  age: string
} | null

export const SettingsForm = () => {
  const user = useCurrentUser()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [fighter, setFighter] = useState<FighterData>(null)

  //Get the current fighter data with the user id to fill out the fields in the form
  useEffect(() => {
    if (user?.id) {
      console.log(`Fetching data for user id: ${user.id}`)
      getFighterDataById(user.id).then(data => {
        console.log(`Data fetched: ${JSON.stringify(data)}`)
        setFighter(data)
        if (data) {
          form.reset({
            weight: data.weight,
            gender: data.gender,
            weight_class: data.weight_class,
            kup: data.kup,
            age:data.age,
          })
        }
      })
    }
  }, [user?.id])
  
  //Create valdiation for the form
  const form = useForm<z.infer<typeof FighterDataSchema>>({
    resolver: zodResolver(FighterDataSchema),
  })

  //When form submitted pass the filled out fields to the create fighter function
  const submitFighterData = (values: z.infer<typeof FighterDataSchema>) => {
    startTransition(() => {
      createFighterData(values, user?.id).then((data) => {
        if(data.error) toast({ description: data.error })
        toast({ description: data.success })
      })
    })  
  }

  return(
    <div className="w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitFighterData)} className="space-y-6">
          <div className="space-y-2">
            <FormField 
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
              control={form.control}
              name="gender"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={fighter ? fighter.gender : "Choose a gender"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">MALE</SelectItem>
                      <SelectItem value="FEMALE">FEMALE</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />  
            <FormField 
              disabled={isPending}
              control={form.control}
              name="weight_class"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Weight Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={fighter ? fighter.weight_class : "Select a weight class"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="-45">-45</SelectItem>
                      <SelectItem value="-48">-48</SelectItem>
                      <SelectItem value="-51">-51</SelectItem>
                      <SelectItem value="-55">-55</SelectItem>
                      <SelectItem value="-59">-59</SelectItem>
                      <SelectItem value="-63">-63</SelectItem>
                      <SelectItem value="-68">-68</SelectItem>
                      <SelectItem value="-73">-73</SelectItem>
                      <SelectItem value="-78">-78</SelectItem>
                      <SelectItem value="+78">+78</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />  
            <FormField 
              disabled={isPending}
              control={form.control}
              name="kup"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Kup</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={fighter ? fighter.kup : "Select a kup"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />  
          </div>
          <Button disabled={isPending} className="w-full" type="submit">
            Update data
          </Button>
        </form>
      </Form>
    </div>
  )
}
