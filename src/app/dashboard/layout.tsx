import { DashboardFooter } from "@/components/layout/Footer";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import { Metadata } from "next";
import { siteUrl } from "@/utils/appStore";

export const metadata: Metadata = {
    title: "Dashboard",
    description:
        "Bloggers Blog dashboard to manage your posts and continue writing.",
    openGraph: {
        title: "Dashboard | Bloggers Blog",
        description:
            "Access your Bloggers Blog dashboard.",
        url: `${siteUrl}/dashboard`,
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <main className=" flex h-screen bg-gray-200 dark:bg-gray-600">
                {/* sidebar */}
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* topbar */}
                    <Topbar />
                    <div id="dashboard-scroll-container" className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </main>
            <DashboardFooter />
        </>
    )
}