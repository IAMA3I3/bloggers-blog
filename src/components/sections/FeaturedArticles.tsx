import { Suspense } from "react";
import { FeaturedPostCard } from "../posts/PostCard";
import Link from "next/link";
import { Button } from "../ui/Button";
import { FaArrowRight } from "react-icons/fa6";

export default function FeaturedArticles() {

    return (
        <section className=" bg-white dark:bg-background py-8">
            <div className=" container px-6 mx-auto">
                {/* Section header */}
                <div className="mb-16 max-w-2xl">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        Featured content
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                        Read what matters
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Explore thoughtful articles written by developers and creators who
                        value clarity, depth, and real-world experience.
                    </p>
                </div>
                {/* Articles grid */}
                <Suspense fallback={<SkeletonLoading />}>
                    <FeaturedPostCards />
                </Suspense>
                <div className=" mt-16">
                    <Link href={"/blog"}>
                        <Button text="View More" icon={FaArrowRight} iconPosition="end" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

async function FeaturedPostCards() {

    await new Promise(res => setTimeout(res, 3000))

    return (
        <div className="grid gap-8 lg:grid-cols-10">
            {/* main */}
            <div className=" lg:col-span-6">
                <FeaturedPostCard
                    category="web-development"
                    id="building-scalable-applications-with-next-js-app-router"
                    media={[]}
                    title="Building scalable applications with Next.js App Router"
                    content="A practical guide to structuring modern Next.js applications using Server Components, Server Actions, and best practices."
                    authorName="Ali_Baba"
                    createdAt={new Date("2026-02-03T12:06:32Z")}
                />
            </div>
            <div className=" lg:col-span-4 space-y-8">
                <FeaturedPostCard
                    variant="secondary"
                    category="productivity"
                    id="writing-clean-technical-content-that-converts"
                    title="Writing clean technical content that converts"
                    content="Why clarity and structure matter more than volume in technical writing."
                    authorName="Ali_Baba"
                    createdAt={new Date("2026-01-01T12:06:32Z")}
                />
                <FeaturedPostCard
                    variant="secondary"
                    category="architecture"
                    id="designing-production-ready-systems-as-a-solo-developer"
                    title="Designing production-ready systems as a solo developer"
                    content="Lessons learned from building and shipping real-world full-stack apps."
                    authorName="Ali_Baba"
                    createdAt={new Date("2026-01-30T12:06:32Z")}
                />
            </div>
        </div>
    )
}

function SkeletonLoading() {

    return (
        <div className="grid gap-8 lg:grid-cols-10">
            <div className=" lg:col-span-6">
                <div className="rounded-xl h-100 border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden">
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer">
                            <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/95 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                        </div>
                    </div>
                    <div className=" absolute top-4 left-4">
                        <span className=" text-xs font-medium text-white/0 capitalize py-1 px-3 rounded bg-muted/40">
                            Lorem, ipsum.
                        </span>
                    </div>
                    <div className=" absolute top-4 right-4">
                        <div className=" p-2 bg-muted/40 text-white/0 rounded-lg leading-none text-xl">1O</div>
                    </div>
                    <div className=" absolute bottom-0 w-full p-4 text-white/0">
                        <div className=" text-xl mb-2 bg-muted/40 rounded-lg leading-none">Lorem ipsum dolor sit amet consectetur.</div>
                        <div className=" mb-2 text-sm w-full bg-muted/40 rounded-lg leading-none">text</div>
                        <div className=" mb-4 text-sm w-1/2 bg-muted/40 rounded-lg leading-none">text</div>
                        <div className=" flex items-center flex-wrap gap-4 text-sm font-semibold">
                            <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                            <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" lg:col-span-4 space-y-8">
                <div className="rounded-xl h-45 border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden">
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer">
                            <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/95 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                        </div>
                    </div>
                    <div className=" absolute top-4 left-4">
                        <span className=" text-xs font-medium text-white/0 capitalize py-1 px-3 rounded bg-muted/40">
                            Lorem, ipsum.
                        </span>
                    </div>
                    <div className=" absolute top-4 right-4">
                        <div className=" p-2 bg-muted/40 text-white/0 rounded-lg leading-none text-xl">1O</div>
                    </div>
                    <div className=" absolute bottom-0 w-full p-4 text-white/0">
                        <div className=" mb-2 bg-muted/40 rounded-lg leading-none">Lorem ipsum dolor sit amet consectetur.</div>
                        <div className=" flex items-center flex-wrap gap-4 text-sm font-semibold">
                            <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                            <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl h-45 border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden">
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer">
                            <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/95 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                        </div>
                    </div>
                    <div className=" absolute top-4 left-4">
                        <span className=" text-xs font-medium text-white/0 capitalize py-1 px-3 rounded bg-muted/40">
                            Lorem, ipsum.
                        </span>
                    </div>
                    <div className=" absolute top-4 right-4">
                        <div className=" p-2 bg-muted/40 text-white/0 rounded-lg leading-none text-xl">1O</div>
                    </div>
                    <div className=" absolute bottom-0 w-full p-4 text-white/0">
                        <div className=" mb-2 bg-muted/40 rounded-lg leading-none">Lorem ipsum dolor sit amet consectetur.</div>
                        <div className=" flex items-center flex-wrap gap-4 text-sm font-semibold">
                            <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                            <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}