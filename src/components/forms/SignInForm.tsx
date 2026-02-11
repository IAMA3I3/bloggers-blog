"use client"

import { SignInFormData } from "@/types/auth"
import { SignInFormError, validateSignIn } from "@/utils/validators/signInValidator"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import Link from "next/link"

const initialData: SignInFormData = {
    identifier: "",
    password: ""
}

export default function () {

    const [data, setData] = useState<SignInFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<SignInFormError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateSignIn(data)

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
        toast.success("Welcome back")
    }

    return (
        <div className=" w-full">
            <form onSubmit={onFormSubmit} className=" w-full space-y-4">
                {error.default && <p className=" text-sm font-semibold text-red-400 text-center">{error.default}</p>}
                <Input
                    variant="secondary"
                    value={data.identifier}
                    onChange={onInputChange}
                    type="text"
                    name="identifier"
                    label="Username / Email"
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.identifier || undefined}
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
                <div className=" flex justify-center">
                    <Button isLoading={isLoading} type="submit" text="LOGIN" size="large" rounded />
                </div>
                <p className=" text-sm font-semibold text-muted text-center">Don't have an account? <Link href={"/sign-up"} className=" text-primary hover:underline">Register</Link></p>
            </form>
        </div>
    )
}