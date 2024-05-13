"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../app/form-error"
import { FormSuccess } from "../app/form-success"
import { useState, useTransition } from "react"
import { register } from "@/actions/register"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Create a new account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              disabled={isPending}
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
              disabled={isPending}
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="name@example.com"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              disabled={isPending}
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******"/>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type="submit" className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

