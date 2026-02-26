"use client"

import { EditProfileFormData } from "@/types/auth"
import { Input } from "../ui/Input"
import { FormEvent, useState } from "react"
import { EditProfileFormError, validateEditaProfile } from "@/utils/validators/editProfileValidator"
import { Button } from "../ui/Button"
import toast from "react-hot-toast"

type EditProfileFormProps = {
    initialData: EditProfileFormData
}

export default function EditProfileForm({ initialData }: EditProfileFormProps) {

    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<EditProfileFormError>({})

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateEditaProfile(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        await new Promise(res => setTimeout(res, 2000))
        console.log(data)

        setError({})
        setIsLoading(false)
        toast.success("Profile updated")
    }

    return (
        <form onSubmit={onFormSubmit} className=" w-full space-y-4">
            <Input
                label="Username"
                value={data.username}
                onChange={(e) => setData(prev => ({ ...prev, username: e.target.value }))}
                error={error.username}
            />
            <div className=" flex justify-center">
                <Button text="Update" rounded type="submit" isLoading={isLoading} />
            </div>
        </form>
    )
}