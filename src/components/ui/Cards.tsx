"use client"

import { useCountUp } from "@/utils/useCountUp"
import { BasicCard } from "../containers/Cards"

type StatsCardProps = {
    display?: boolean
    icon: React.ReactNode
    value: number
    text: string
}

export const StatsCard = ({ display = false, icon, value, text }: StatsCardProps) => {

    const count = useCountUp(value, 1000, display)

    if (!display) return null

    return (
        <BasicCard noBackground>
            <div className=" flex gap-4 *:flex-none flex-wrap justify-between items-center">
                <div className=" w-15 aspect-square rounded-full bg-gray-200 dark:bg-gray-700 flex justify-center items-center text-2xl">
                    {icon}
                </div>
                <h2 className=" text-3xl font-semibold">{count}</h2>
            </div>
            <p className=" mt-4 text-muted font-semibold text-right border-t border-border">{text}</p>
        </BasicCard>
    )
}