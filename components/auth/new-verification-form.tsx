"use client"
import { CardWrapper } from "./card-wrapper"
import { BarLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../app/form-error"
import { FormSuccess } from "../app/form-success"

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const onSubmit = useCallback(() => {
    if(success || error) return

    if(!token) { 
      setError("Missing token")
      return
    }

    newVerification(token).then((data) => {
      setSuccess(data.success)
      setError(data.error)
    }).catch(() => {
        setError("Something went wrong")
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return(
    <CardWrapper headerLabel="Confirming your email" backButtonHref="/auth/login" backButtonLabel="Back to login">
      <div className="flex items-center w-full justify-center">
        {!success && !error &&(
          <BarLoader color="#000000" className="rounded w-full" width={"180px"}/>
        )}
        <FormSuccess message={success}/>
        {!success && (
          <FormError message={error}/>
        )}
      </div>
    </CardWrapper>
  )
}
