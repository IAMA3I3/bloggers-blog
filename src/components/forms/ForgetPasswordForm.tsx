"use client"

import { ForgetPasswordFormData } from "@/types/auth"
import { ForgetPasswordError, validateForgetPassword } from "@/utils/validators/forgetPasswordValidator"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { forgetPasswordAction } from "@/actions/auth"
import { useRouter } from "next/navigation"

const initialData: ForgetPasswordFormData = {
    email: ""
}

export default function ForgetPasswordForm() {
    const router = useRouter()
    const [data, setData] = useState<ForgetPasswordFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ForgetPasswordError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateForgetPassword(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        const result = await forgetPasswordAction(data)
        if (!result.success) {
            setError(result.errors)
            setIsLoading(false)
            return
        }

        setData(initialData)
        setError({})
        setIsLoading(false)
        toast.success("Password reset link sent")
        router.replace("/reset-password")
    }

    return (
        <div className=" w-full">
            <form onSubmit={onFormSubmit} className=" w-full space-y-4">
                {error.default && <p className=" text-sm font-semibold text-red-400 text-center">{error.default}</p>}
                <Input
                    variant="secondary"
                    value={data.email}
                    onChange={onInputChange}
                    type="text"
                    name="email"
                    label="Email"
                    id="email"
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.email || undefined}
                />
                <div className=" flex justify-center">
                    <Button isLoading={isLoading} type="submit" text="SUBMIT" size="large" rounded />
                </div>
            </form>
        </div>
    )
}