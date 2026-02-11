"use client"

import { VerifyAccountFormData } from "@/types/auth"
import { validateVerifyAccount, VerifyAccountError } from "@/utils/validators/verifyAccountValidator"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"

const initialData: VerifyAccountFormData = {
    otp: ""
}

export default function VerifyAccountForm() {
    const [data, setData] = useState<VerifyAccountFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<VerifyAccountError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateVerifyAccount(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        await new Promise(res => setTimeout(res, 2000)) // simulate delay
        console.log(data)

        setData(initialData)
        setError({})
        setIsLoading(false)
        toast.success("Account verified")
    }

    return (
        <div className=" w-full">
            <form onSubmit={onFormSubmit} className=" w-full space-y-4">
                {error.default && <p className=" text-sm font-semibold text-red-400 text-center">{error.default}</p>}
                <Input
                    variant="secondary"
                    value={data.otp}
                    onChange={onInputChange}
                    type="text"
                    name="otp"
                    label="OTP"
                    id="otp"
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.otp || undefined}
                />
                <div className=" flex justify-center">
                    <Button isLoading={isLoading} type="submit" text="VERIFY" size="large" rounded />
                </div>
            </form>
        </div>
    )
}