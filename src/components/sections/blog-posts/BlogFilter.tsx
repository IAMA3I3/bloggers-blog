"use client"

import { StateButton } from "@/components/ui/Button";
import { DropSelectMenu } from "@/components/ui/DropMenu";
import { periods, postCategories } from "@/utils/appStore";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const categories = ["all", ...postCategories]

export default function BlogFilter() {

    const [selectedDate, setSelectedDate] = useState(periods[0])
    const [selectedCategory, setSelectedCategory] = useState("all")

    return (
        <div className=" space-y-4">
            <div className=" flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className=" relative w-full sm:w-100">
                    <input
                        type="text"
                        placeholder="Search articles..."
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
