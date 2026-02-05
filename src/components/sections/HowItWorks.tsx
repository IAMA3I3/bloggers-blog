import { FiUserPlus, FiEdit, FiUpload } from "react-icons/fi"
import { BasicCard } from "../containers/Cards"

export default function HowItWorks() {
    return (
        <section className="bg-gray-100 py-24 dark:bg-gray-800">
            <div className=" container mx-auto px-6">

                {/* Header */}
                <div className="mb-16 max-w-2xl">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        How it works
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                        From idea to published
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        A simple, distraction-free workflow that lets you focus on writing
                        and publishing great content.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid gap-12 sm:grid-cols-2x lg:grid-cols-3">
                    <Step
                        number="01"
                        icon={<FiUserPlus />}
                        title="Create an account"
                        description="Sign up and get access to a clean, modern writing environment."
                    />
                    <Step
                        number="02"
                        icon={<FiEdit />}
                        title="Write your content"
                        description="Draft, edit, and refine your article using Markdown or MDX."
                    />
                    <Step
                        number="03"
                        icon={<FiUpload />}
                        title="Publish & share"
                        description="Publish instantly and share your ideas with a global audience."
                    />
                </div>
            </div>
        </section>
    )
}

function Step({
    number,
    icon,
    title,
    description,
}: {
    number: string
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <BasicCard overflow>

            {/* Step number */}
            <span className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                {number}
            </span>

            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                <span className="text-xl">{icon}</span>
            </div>

            {/* Content */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </BasicCard>
    )
}
