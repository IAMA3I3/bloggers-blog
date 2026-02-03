import Link from "next/link";
import { Button } from "../ui/Button";

export default function FinalCTA() {
    return (
        <section className="relative overflow-hidden bg-gray-700 dark:bg-gray-950 py-24">

            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="cta-grid absolute inset-0" />
            </div>

            <div className=" container mx-auto px-6">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
                </div>

                <div className="mx-auto max-w-3xl px-6 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Start publishing with clarity
                    </h2>

                    <p className="mt-4 text-lg text-gray-300">
                        Bloggers Blog gives you a clean, modern platform to write, publish,
                        and share ideas that matter — without distractions.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link href={"/sign-up"}>
                            <Button text="Create an account" size="large" />
                        </Link>

                        <Link href={"/blog"}>
                            <Button text="Explore Blog" outlined size="large" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
