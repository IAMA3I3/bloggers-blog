import { PageCard } from "@/components/containers/Cards";
import CapsNav from "@/components/layout/CapsNav";
import { DashboardFooter } from "@/components/layout/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" relative min-h-screen overflow-hidden p-6 pt-20 flex justify-center items-center">
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="hero-grid absolute inset-0" />
            </div>
            <CapsNav />
            <PageCard>
                {children}
            </PageCard>
            <DashboardFooter />
        </main>
    )
}