import Link from "next/link";
import { Button } from "../ui/Button";
import { HeroPostCard } from "../posts/PostCard";
import { Suspense } from "react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-background">

            {/* ─── ANIMATED BACKGROUND ─── */}
            <div className="pointer-events-none absolute inset-0 z-0">

                {/* Orb A — top-left */}
                <div className="hero-orb-a absolute -top-40 -left-40 w-150 h-150 rounded-full" />

                {/* Orb B — bottom-right */}
                <div className="hero-orb-b absolute -bottom-32 -right-32 w-125 h-125 rounded-full" />

                {/* Orb C — center */}
                <div className="hero-orb-c absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full" />

                {/* Grid overlay */}
                <div className="hero-grid absolute inset-0" />
            </div>

            {/* ─── CONTENT ─── */}
            <div className="relative z-10 container mx-auto px-6 py-24 lg:grid lg:grid-cols-2 lg:gap-16 lg:py-32">

                {/* LEFT */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Publish ideas that{" "}
                        <span className="relative inline-block">
                            matter
                            <span className="absolute left-0 -bottom-1 h-2 w-full bg-primary opacity-40" />
                        </span>
                        .
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                        Bloggers Blog is a modern, feature-rich publishing platform built
                        for writers and developers who care about performance, clarity, and
                        quality content.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link href={"/dashboard/posts/create"}>
                            <Button text="Start Writing" size="large" variant="primary" />
                        </Link>
                        <Link href={"/blog"}>
                            <Button text="Explore Articles" size="large" outlined variant="primary" />
                        </Link>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative mt-16 lg:mt-0">
                    <Suspense fallback={<SkeletonLoading />}>
                        <HeroPostCards />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}

async function HeroPostCards() {

    await new Promise(res => setTimeout(res, 2000))

    return (
        <div className="space-y-4">
            {/* Card 1 */}
            <HeroPostCard
                category="web-development"
                title="Building scalable apps with Next.js"
                content="Learn how modern Next.js features like Server Components and Server Actions improve performance."
            />

            {/* Card 2 */}
            <HeroPostCard
                category="productivity"
                title="Writing clean content that converts"
                content="Why clarity, structure, and simplicity matter more than volume."
            />

            {/* Card 3 */}
            <HeroPostCard
                category="architecture"
                title="Designing production-ready systems"
                content="Lessons from building real-world full-stack applications."
            />
        </div>
    )
}

function SkeletonLoading() {

    return (
        <div className="space-y-4">
            {/* skeleton loading design */}
            {
                [1, 2, 3].map(i => (
                    <div key={i} className=" relative rounded-xl p-5 border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden group">

                        {/* Shimmer effect overlay */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer">
                                <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/60 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                            </div>
                        </div>

                        <span className="text-xs inline-block font-medium text-white/0 bg-muted/50 rounded-lg leading-none">Lorem.</span>
                        <br />
                        <h3 className="mt-2 text-base inline-block font-semibold text-white/0 bg-muted/50 rounded-lg leading-none">Lorem ipsum dolor sit amet.</h3>
                        <p className="mt-2 text-sm text-white/0 bg-muted/50 rounded-lg w-full leading-none">text</p>
                        <p className="mt-2 text-sm text-white/0 bg-muted/50 rounded-lg w-1/2 leading-none">text</p>
                    </div>
                ))
            }
        </div>
    )
}