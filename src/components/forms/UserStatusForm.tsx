"use client"

import { updateStatusAction } from "@/actions/auth"
import { UserStatus } from "@/types/auth"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import toast from "react-hot-toast"
import { DropSelectMenu } from "../ui/DropMenu"
import { Button } from "../ui/Button"

type UserStatusFormProps = {
    userId: string
    initialStatus: UserStatus
}

const userStatus: UserStatus[] = ["active", "inactive"]

export default function UserStatusForm({ userId, initialStatus }: UserStatusFormProps) {

    const [status, setStatus] = useState<UserStatus>(initialStatus)
    const [isLoading, setIsLoading] = useState(false)

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const result = await updateStatusAction(userId, status)
        if (!result.success) {
            setIsLoading(false)
            toast.error(result.errors)
            return
        }

        setIsLoading(false)
        toast.success("Status updated")
    }

    return (
        <form onSubmit={onFormSubmit}>
            <DropSelectMenu
                value={status}
                setValue={setStatus as Dispatch<SetStateAction<string>>}
                menuItems={userStatus}
                fullWidth
                className=" w-full bg-transparent py-2 px-4 rounded-full border-2 border-border focus:border-primary outline-none"
            />
            <div className=" mt-4 flex justify-center">
                <Button
                    text="Update Status"
                    rounded
                    type="submit"
                    isLoading={isLoading}
                />
            </div>
        </form>
    )
}