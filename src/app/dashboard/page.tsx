import Chart from "@/components/dashboard/Chart";
import Stats from "@/components/dashboard/Stats";

export default function DashboardPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                Dashboard Overview
            </h2>
            <div className=" space-y-8">
                {/* stats */}
                <Stats />
                {/* chart */}
                <Chart />
            </div>
        </>
    )
}