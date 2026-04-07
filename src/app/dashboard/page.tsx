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
                <Suspense fallback={"Loading Chart ..."}>
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