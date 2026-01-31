import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar/Navbar.server";

export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" flex-1 flex flex-col">
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}