import { BasicCard } from "@/components/containers/Cards";
import ChartServer from "@/components/dashboard/Chart.server";
import QuickLinks from "@/components/dashboard/QuickLinks";
import RecentPosts from "@/components/dashboard/RecentPosts";
import Stats from "@/components/dashboard/Stats";
import { Suspense } from "react";

export default async function DashboardPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                Dashboard Overview
            </h2>
            <div className=" space-y-8">
                {/* stats */}
                <Stats />
                {/* chart */}
                <Suspense fallback={<ChartSkeletonLoading />}>
                    <ChartServer />
                </Suspense>
                <div className=" flex gap-8 flex-col md:flex-row *:w-full">
                    <RecentPosts />
                    <QuickLinks />
                </div>
            </div>
        </>
    )
}

function ChartSkeletonLoading() {
    return (
        <BasicCard noBackground>
            <h3 className="text-base sm:text-lg font-semibold mb-1 inline-block text-white/0 bg-muted/50 rounded-lg leading-none">Posts</h3>
            <p className="text-xs sm:text-sm mb-4 inline-block text-white/0 bg-muted/50 rounded-lg leading-none">Loading posts tracking</p>
            <div className="relative h-64 sm:h-72 md:h-80 w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer">
                        <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/60 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                    </div>
                </div>
            </div>
        </BasicCard>
    )
}