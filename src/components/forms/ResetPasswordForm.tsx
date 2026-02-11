"use client"

import { ResetPasswordFormData } from "@/types/auth"
import { ResetPasswordError, validateResetPassword } from "@/utils/validators/resetPasswordvalidator"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"

const initialData: ResetPasswordFormData = {
    otp: "",
    password: "",
    confirmPassword: ""
}

export default function ResetPasswordForm() {
    const [data, setData] = useState<ResetPasswordFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ResetPasswordError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateResetPassword(data)

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
        toast.success("Password changed")
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
                <Input
                    variant="secondary"
                    value={data.password}
                    onChange={onInputChange}
                    type="text"
                    name="password"
                    label="Password"
                    viewPassword
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.password || undefined}
                />
                <Input
                    variant="secondary"
                    value={data.confirmPassword}
                    onChange={onInputChange}
                    type="text"
                    name="confirmPassword"
                    label="Confirm Password"
                    viewPassword
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.confirmPassword || undefined}
                />
                <div className=" flex justify-center">
                    <Button isLoading={isLoading} type="submit" text="SUBMIT" size="large" rounded />
                </div>
            </form>
        </div>
    )
}