"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { StateButton } from "../ui/Button"

const filters = ["all", "draft", "published"]

export default function PostsFilter() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const initialStatus = searchParams.get("status") || "all"

    const [selectedStatus, setSelectedStatus] = useState(initialStatus)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (selectedStatus && selectedStatus !== "all") {
            params.set("status", selectedStatus)
        } else {
            params.delete("status")
        }

        params.set("page", "1")

        router.push(`/dashboard/posts?${params.toString()}`, { scroll: false })
    }, [selectedStatus])

    return (
        <div className=" flex gap-3 overflow-x-auto pb-2 mb-4">
            {
                filters.map(filter => (
                    <StateButton key={filter} text={filter} isActive={selectedStatus === filter} onClick={() => setSelectedStatus(filter)} />
                ))
            }
        </div>
    )
}