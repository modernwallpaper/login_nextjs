"use client"
import { createUser } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { createUserSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const CreateUserForm = () => {
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = (values: z.infer<typeof createUserSchema>) => {
    startTransition(() => {
      createUser(values).then((data) => {
        console.log(data?.error)
        console.log(data?.success)
      })
    })    
  }

  return(
    <div className="w-[400px] m-0">
      <CardHeader>
        <CardTitle>Create a new User</CardTitle>
        <CardDescription>Enter the new user info to add them to the website</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="someone"/>
                    </FormControl>
                  </FormItem>
                )} 
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="name@example.com" type="email"/>
                    </FormControl>
                  </FormItem>
                )} 
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password"/>
                    </FormControl>
                    <p className="text-muted-foreground text-sm font-light">Must be at least 6 Characters</p>
                  </FormItem>
                )} 
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role for the new user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit">Create user</Button>
          </form>
        </Form> 
      </CardContent>
    </div>
  )
}
