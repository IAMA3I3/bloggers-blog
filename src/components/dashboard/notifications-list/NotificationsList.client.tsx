"use client"

import { ActionListItem } from "@/components/ui/ListItem"
import Pagination from "@/components/ui/Pagination"
import { Notification } from "@/types/notification"
import { formatPostDate } from "@/utils/formatPostDate"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type NotificationsListClientProps = {
    notifications: Notification[]
}

const NOTIFICATIONS_PER_PAGE = 10

export default function NotificationsListClient({ notifications }: NotificationsListClientProps) {

    const router = useRouter()
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get("page") || 1)

    const totalPages = Math.ceil(notifications.length / NOTIFICATIONS_PER_PAGE)

    const startingIndex = (currentPage - 1) * NOTIFICATIONS_PER_PAGE

    const currentNotifications = notifications.slice(startingIndex, startingIndex + NOTIFICATIONS_PER_PAGE)

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

    if (currentNotifications.length === 0) return <h3 className=" mt-4 text-3xl font-semibold text-center text-gray-400">No notification yet</h3>

    return (
        <div className=" space-y-4">
            {
                currentNotifications.map(notification => (
                    <ActionListItem
                        key={notification._id}
                        mutedText={formatPostDate(notification.createdAt)}
                        mainText={notification.content}
                        href={`/dashboard/notifications/${notification._id}`}
                        status={{
                            variant: notification.status === "unread" ? "success" : "secondary",
                            text: notification.status === "unread" ? "Unread" : "Opened"
                        }}
                    />
                ))
            }
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setPage} />
        </div>
    )
}