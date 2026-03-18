"use client"

import { DeleteAccountFormData } from "@/types/auth"
import { DeleteAccountFormError, validateDeleteAccount } from "@/utils/validators/deleteAccountValidator"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"

const initialData: DeleteAccountFormData = {
    password: ""
}

export default function DeleteAccountForm() {

    const router = useRouter()

    const [data, setData] = useState(initialData)
    const [error, setError] = useState<DeleteAccountFormError>({})
    const [isLoading, setIsLoading] = useState(false)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateDeleteAccount(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        await new Promise(res => setTimeout(res, 2000))
        console.log(data)

        setData(initialData)
        setError({})
        setIsLoading(false)
        toast.success("Account Deleted")
        router.push("/")
    }

    return (
        <form onSubmit={onFormSubmit} className=" w-full space-y-4">
            {error.default && <p className=" text-sm font-semibold text-red-400 text-center">{error.default}</p>}
            <Input
                variant="secondary"
                label="Password"
                viewPassword
                backgroundColor="bg-white dark:bg-slate-900"
                name="password"
                value={data.password}
                onChange={onInputChange}
                error={error.password}
                id="password"
            />
            <div className=" flex justify-center">
                <Button
                    text="Delete"
                    type="submit"
                    rounded
                    variant="danger"
                    size="large"
                    isLoading={isLoading}
                />
            </div>
        </form>
    )
}