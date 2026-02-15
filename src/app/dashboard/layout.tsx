import { DashboardFooter } from "@/components/layout/Footer";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <main className=" flex h-screen">
                {/* sidebar */}
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* topbar */}
                    <Topbar />
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </main>
            <DashboardFooter />
        </>
    )
}