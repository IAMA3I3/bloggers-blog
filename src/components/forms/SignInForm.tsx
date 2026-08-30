"use client"

import { SignInFormData } from "@/types/auth"
import { SignInFormError, validateSignIn } from "@/utils/validators/signInValidator"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import Link from "next/link"
import { signInAction } from "@/actions/auth"
import { useRouter } from "next/navigation"

const initialData: SignInFormData = {
    identifier: "",
    password: ""
}

const FAILED_ATTEMPTS_HINT_THRESHOLD = 2

export default function () {
    const router = useRouter()
    const [data, setData] = useState<SignInFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<SignInFormError>({})
    const [failedAttempts, setFailedAttempts] = useState(0)

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

        const result = await signInAction(data)
        if (!result.success) {
            setError(result.errors)
            setFailedAttempts((prev) => prev + 1)
            setIsLoading(false)
            return
        }

        setData(initialData)
        setError({})
        setFailedAttempts(0)
        setIsLoading(false)
        toast.success("Welcome back")
        router.replace("/dashboard")
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
                    id="identifier"
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
                    id="password"
                    viewPassword
                    backgroundColor=" bg-white dark:bg-slate-900"
                    error={error.password || undefined}
                />
                {failedAttempts >= FAILED_ATTEMPTS_HINT_THRESHOLD && (
                    <p className=" text-sm text-amber-500 text-center">
                        Trouble signing in? Repeated failed attempts will temporarily lock this account — resetting your password may be quicker.
                    </p>
                )}
                <Link href={"/forget-password"} className=" inline-block text-sm font-semibold text-muted underline hover:text-primary">Forget Password</Link>
                <div className=" flex justify-center">
                    <Button isLoading={isLoading} type="submit" text="LOGIN" size="large" rounded />
                </div>
                <p className=" text-sm font-semibold text-muted text-center">Don't have an account? <Link href={"/sign-up"} className=" text-primary hover:underline">Register</Link></p>
            </form>
        </div>
    )
}