"use client"

import { SignUpFormData } from "@/types/auth"
import { SignUpFormError, validateSignUp } from "@/utils/validators/signUpValidator"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import Link from "next/link"

const initialData: SignUpFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function SignUpForm() {
    const [data, setData] = useState<SignUpFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<SignUpFormError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateSignUp(data)

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
        toast.success("Account created")
    }

    return (
        <div className=" w-full">
            <form onSubmit={onFormSubmit} className=" w-full space-y-4">
                {error.default && <p className=" text-sm font-semibold text-red-400 text-center">{error.default}</p>}
                <Input
                    variant="secondary"
                    value={data.username}
                    onChange={onInputChange}
                    type="text"
                    name="username"
                    label="Username"
                    id="username"
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.username || undefined}
                />
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
                <Input
                    variant="secondary"
                    value={data.password}
                    onChange={onInputChange}
                    type="text"
                    name="password"
                    label="Password"
                    id="password"
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
                    id="confirmPassword"
                    viewPassword
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.confirmPassword || undefined}
                />
                <div className=" flex justify-center">
                    <Button isLoading={isLoading} type="submit" text="REGISTER" size="large" rounded />
                </div>
                <p className=" text-sm font-semibold text-muted text-center">Already have an account? <Link href={"/sign-in"} className=" text-primary hover:underline">Login</Link></p>
                <p className=" text-xs text-muted text-center">By registering you agree to our <Link href={"/terms"} className=" underline hover:text-primary">terms & conditions</Link></p>
            </form>
        </div>
    )
}