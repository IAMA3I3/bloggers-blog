"use client"

import { UserRole } from "@/types/auth"
import { DropSelectMenu } from "../ui/DropMenu"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Button } from "../ui/Button"
import toast from "react-hot-toast"
import { updateRoleAction } from "@/actions/auth"

type UserRoleFormProps = {
    userId: string
    initialRole: UserRole
}

const userRoles: UserRole[] = ["user", "admin"]

export default function UserRoleForm({ userId, initialRole }: UserRoleFormProps) {

    const [role, setRole] = useState<UserRole>(initialRole)
    const [isLoading, setIsLoading] = useState(false)

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const result = await updateRoleAction(userId, role)
        if (!result.success) {
            setIsLoading(false)
            toast.error(result.errors)
            return
        }

        setIsLoading(false)
        toast.success("Role updated")
    }

    return (
        <form onSubmit={onFormSubmit} className=" mt-8">
            <DropSelectMenu
                value={role}
                setValue={setRole as Dispatch<SetStateAction<string>>}
                menuItems={userRoles}
                fullWidth
                className=" w-full bg-transparent py-2 px-4 rounded-full border-2 border-border focus:border-primary outline-none"
            />
            <div className=" mt-4 flex justify-center">
                <Button
                    text="Update Role"
                    rounded
                    type="submit"
                    isLoading={isLoading}
                />
            </div>
        </form>
    )
}