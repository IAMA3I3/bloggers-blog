"use client"

import { ChangePasswordFormData } from "@/types/auth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { ChangePasswordFormError, validateChangePassword } from "@/utils/validators/changePasswordValidator";
import toast from "react-hot-toast";

const initialData: ChangePasswordFormData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
}

export default function ChangePasswordForm() {

    const [data, setData] = useState(initialData)
    const [error, setError] = useState<ChangePasswordFormError>({})
    const [isLoading, setIsLoading] = useState(false)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateChangePassword(data)

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
        toast.success("Password changed")
    }

    return (
        <form onSubmit={onFormSubmit} className=" w-full space-y-4">
            <Input
                variant="secondary"
                label="Current Password"
                viewPassword
                backgroundColor="bg-white dark:bg-slate-900"
                name="currentPassword"
                value={data.currentPassword}
                onChange={onInputChange}
                error={error.currentPassword}
                id="current-password"
            />
            <Input
                variant="secondary"
                label="New Password"
                viewPassword
                backgroundColor="bg-white dark:bg-slate-900"
                name="newPassword"
                value={data.newPassword}
                onChange={onInputChange}
                error={error.newPassword}
                id="new-password"
            />
            <Input
                variant="secondary"
                label="Confirm Password"
                viewPassword
                backgroundColor="bg-white dark:bg-slate-900"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={onInputChange}
                error={error.confirmPassword}
                id="confirm-password"
            />
            <div className=" flex justify-center">
                <Button
                    text="Update"
                    type="submit"
                    rounded
                    size="large"
                    isLoading={isLoading}
                />
            </div>
        </form>
    )
}