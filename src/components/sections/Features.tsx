import {
    FiEdit3,
    FiZap,
    FiLock,
    FiTrendingUp,
    FiGrid,
    FiSmile,
} from "react-icons/fi"
import { BasicCard } from "../containers/Cards"

export default function Features() {
    return (
        <section className="bg-white/80 py-24 dark:bg-gray-950">
            <div className=" container mx-auto px-6">

                {/* Section header */}
                <div className="mb-16 max-w-2xl">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        Why Bloggers Blog
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                        Built for modern publishing
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Every feature is designed to support clarity, performance, and a
                        great writing experience — without unnecessary complexity.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <Feature
                        icon={<FiEdit3 />}
                        title="Rich Writing Experience"
                        description="Write using Markdown or MDX with clean formatting and distraction-free editing."
                    />
                    <Feature
                        icon={<FiZap />}
                        title="Fast by Default"
                        description="Built with Next.js Server Components for excellent performance and scalability."
                    />
                    <Feature
                        icon={<FiLock />}
                        title="Secure Authentication"
                        description="Role-based access control for admins, authors, and readers."
                    />
                    <Feature
                        icon={<FiTrendingUp />}
                        title="SEO-First Architecture"
                        description="Dynamic metadata, clean URLs, and search-friendly content structure."
                    />
                    <Feature
                        icon={<FiGrid />}
                        title="Admin Dashboard"
                        description="Manage posts, users, and publishing states from a clean, intuitive dashboard."
                    />
                    <Feature
                        icon={<FiSmile />}
                        title="Thoughtful UX"
                        description="Skeleton loaders, empty states, and graceful error handling throughout the app."
                    />
                </div>
            </div>
        </section>
    )
}

function Feature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <BasicCard hoverEffect>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                <span className="text-xl">{icon}</span>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </BasicCard>
    )
}
