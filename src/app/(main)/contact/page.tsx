import PageHeader from "@/components/layout/PageHeader";
import ContactSection from "@/components/sections/ContactSection";
import CTA from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with the Bloggers Blog team for questions, feedback, or collaboration opportunities.",
    openGraph: {
        title: "Contact | Bloggers Blog",
        description:
            "Reach out to Bloggers Blog for inquiries, feedback, or collaborations.",
        url: `${siteUrl}/contact`,
    },
}

export default function ContactPage() {

    return (
        <div className=" flex-1">
            <PageHeader title="Contact" subtitle=" Have a question, feedback, or a collaboration idea? We’d love to hear from you." currentPage="Contact" />
            <ContactSection />
            <CTA subText="Writers, readers, and collaborators are always welcome.">
                <Link href={"/sign-up"}>
                    <Button text="Create an account" rounded />
                </Link>
            </CTA>
        </div>
    )
}