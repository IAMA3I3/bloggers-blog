"use client"

import Pagination from "@/components/ui/Pagination"
import { ActionListItem } from "../../ui/ListItem"
import { User } from "@/types/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type UsersListClientProps = {
    users: User[]
}

const USERS_PER_PAGE = 10

export default function UsersListClient({ users }: UsersListClientProps) {

    const router = useRouter()
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get("page") || 1)

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE)

    const startingIndex = (currentPage - 1) * USERS_PER_PAGE

    const currentUsers = users.slice(startingIndex, startingIndex + USERS_PER_PAGE)

    const setPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())

        router.push(`/dashboard/users?${params.toString()}`, { scroll: false })
    }

    useEffect(() => {
        const container = document.getElementById("dashboard-scroll-container")

        container?.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [currentPage])


    return (
        <div className=" space-y-4">
            {
                currentUsers.map(user => (
                    <ActionListItem
                        key={user._id}
                        mutedText={user.role}
                        mainText={user.username}
                        contentText={user.email}
                        actionButton={{ action: "EDIT", href: `/dashboard/users/${user._id}` }}
                        deleteAction={{ for: "USERS", id: user._id }}
                    />
                ))
            }
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setPage} />
        </div>
    )
}
