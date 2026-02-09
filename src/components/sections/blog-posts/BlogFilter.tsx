"use client"

import { StateButton } from "@/components/ui/Button";
import { DropSelectMenu } from "@/components/ui/DropMenu";
import { periods, postCategories } from "@/utils/appStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const categories = ["all", ...postCategories]

export default function BlogFilter() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const initialSort = searchParams.get("sort") || periods[0]
    const initialCategory = searchParams.get("category") || "all"

    const [selectedDate, setSelectedDate] = useState(initialSort)
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)

    const initialSearchValue = searchParams.get("search") || ""
    const [searchValue, setSearchValue] = useState(initialSearchValue)

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (searchValue.trim()) {
                params.set("search", searchValue.trim())
                params.set("page", "1") // reset pagination
            } else {
                params.delete("search")
                params.set("page", "1")
            }

            router.push(`/blog?${params.toString()}`, { scroll: false })
        }, 400)

        return () => clearTimeout(timeout)
    }, [searchValue])

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        // SORT (date)
        if (selectedDate) {
            params.set("sort", selectedDate)
        } else {
            params.delete("sort")
        }

        // CATEGORY
        if (selectedCategory && selectedCategory !== "all") {
            params.set("category", selectedCategory)
        } else {
            params.delete("category")
        }

        // Reset pagination
        params.set("page", "1")

        router.push(`/blog?${params.toString()}`, { scroll: false })
    }, [selectedDate, selectedCategory])

    return (
        <div className=" space-y-4">
            <div className=" flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className=" relative w-full sm:w-100">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className=" w-full py-2 px-4 pl-10 rounded-full outline-none border-2 border-border dark:border-gray-500 focus:border-primary bg-transparent"
                    />
                    <FaSearch className=" absolute top-[50%] -translate-y-[50%] left-4 text-muted" />
                </div>
                <div className=" w-full sm:w-auto">
                    <DropSelectMenu
                        value={selectedDate}
                        setValue={setSelectedDate}
                        menuItems={periods}
                        fullWidth
                        className=" w-full py-2 px-4 pr-10 rounded-full cursor-pointer outline-none border-2 border-border dark:border-gray-500 focus:border-primary bg-transparent"
                    />
                </div>
            </div>
            <div className=" flex gap-3 overflow-x-auto pb-2">
                {
                    categories.map(category => (
                        <StateButton key={category} text={category} isActive={selectedCategory === category} onClick={() => setSelectedCategory(category)} />
                    ))
                }
            </div>
        </div>
    )
}
