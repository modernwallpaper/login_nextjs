import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getFighterDataById } from "@/data/user"
import { useCurrentUser } from "@/hooks/use-current-session"
import { FighterDataSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"


export const SettingsForm = () => {
  const user = useCurrentUser()
  const [defaultValuesFighter, setDefaultValuesFighter] = useState<z.infer<typeof FighterDataSchema> | undefined>(undefined)

  // Get Existing Data
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getFighterDataById(user.id)
        if (data) {
          setDefaultValuesFighter(data)
        }
      }
    }
    fetchData()
  }, [user?.id])


  const form = useForm<z.infer<typeof FighterDataSchema>>({
    resolver: zodResolver(FighterDataSchema),
    defaultValues: defaultValuesFighter
  }) 

  return(
    <div className="w-[350px]">
      <Form {...form}>
        <form onSubmit={() => console.log("Submit requested")} className="space-y-6">
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
                    <Input {...field} placeholder="year"/>
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
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />  
          </div>
        </form>
      </Form>
    </div>
  )
}
