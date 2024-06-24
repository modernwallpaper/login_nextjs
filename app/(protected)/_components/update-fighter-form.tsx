"use client"
import { createFighterData } from "@/actions/fighter"
import { updateUserAsAdmin } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FighterDataSchema, UpdateUserSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const UpdateFighterForm = ({ id, weight, gender, weight_class, age, kup }: { id: string, weight: string, gender: "MALE" | "FEMALE", weight_class: string, age: string, kup: string }) => {

  //Create types and default values for the form
  const form = useForm<z.infer<typeof FighterDataSchema>>({
    resolver: zodResolver(FighterDataSchema),
    defaultValues: {
      weight: weight,
      gender: gender,
      weight_class: weight_class,
      age: age,
      kup: kup,
    },
  })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  //Update the fighter 
  const onSubmit = (values: z.infer<typeof FighterDataSchema>) => {
    startTransition(() => {
      createFighterData(values, id).then((data) => {
        router.refresh()
        if(data.error) toast({ description: data.error, variant: "destructive" })
        toast({ description: data.success })
      })
    })    
  }

  return(
    <div className="w-[350px] m-0">
      <CardHeader>
        <CardTitle>Update fighter {id}</CardTitle>
        <CardDescription>Enter the new fighter info to update</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          <SelectValue placeholder={gender} />
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
                          <SelectValue placeholder={weight_class} />
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
                          <SelectValue placeholder={kup} />
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
            <Button disabled={isPending} className="w-full" type="submit">Update fighter</Button>
          </form>
        </Form> 
      </CardContent>
    </div>
  )
}

