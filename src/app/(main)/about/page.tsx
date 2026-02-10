import PageHeader from "@/components/layout/PageHeader";
import Creator from "@/components/sections/Creator";
import CTA from "@/components/sections/CTA";
import HowItWorks from "@/components/sections/HowItWorks";
import Values from "@/components/sections/Values";
import { Button } from "@/components/ui/Button";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn more about Bloggers Blog — our mission, vision, and the ideas behind this modern content publishing platform.",
    openGraph: {
        title: "About | Bloggers Blog",
        description:
            "Discover the mission and story behind Bloggers Blog.",
        url: `${siteUrl}/about`,
    },
}

export default function AboutPage() {

    return (
        <div className=" flex-1">
            <PageHeader title="About" subtitle="Bloggers Blog is a modern content publishing platform built for writers who value clarity, focus, and thoughtful expression. It removes distractions and puts words first." currentPage="About" />
            <Values />
            <HowItWorks />
            <Creator />
            <CTA
                text="Start sharing your ideas"
                subText="Join a growing community of writers publishing thoughtful content."
            >
                <Link href={"/sign-up"}>
                    <Button text="Create an account" rounded />
                </Link>
            </CTA>
        </div>
    )
}