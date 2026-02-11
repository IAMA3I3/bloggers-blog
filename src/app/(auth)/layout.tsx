import { PageCard } from "@/components/containers/Cards";
import { DashboardFooter } from "@/components/layout/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" min-h-screen overflow-hidden p-6 flex justify-center items-center">
            <PageCard>
                {children}
            </PageCard>
            <DashboardFooter />
        </main>
    )
}