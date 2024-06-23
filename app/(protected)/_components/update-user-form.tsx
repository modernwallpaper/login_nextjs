"use client"
import { updateUserAsAdmin } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { UpdateUserSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const UpdateUserForm = ({ email, name, role, id }: { email: string, name: string, role: "ADMIN" | "USER", id: string }) => {

  //Create types and default values for the form
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: email,
      password: "",
      name: name,
      role: role,
      id: id,
    },
  })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  //Update the user
  const onSubmit = (values: z.infer<typeof UpdateUserSchema>) => {
    startTransition(() => {
      updateUserAsAdmin(values).then((data) => {
        router.refresh()
        if(data.error) toast({ description: data.error, variant: "destructive" })
        toast({ description: data.success })
      })
    })    
  }

  return(
    <div className="w-[350px] m-0">
      <CardHeader>
        <CardTitle>Update user {name}</CardTitle>
        <CardDescription>Enter the new user info to update</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                disabled={isPending}
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
                disabled={isPending}
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
                disabled={isPending}
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
                disabled={isPending}
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
            <Button disabled={isPending} className="w-full" type="submit">Update user</Button>
          </form>
        </Form> 
      </CardContent>
    </div>
  )
}

