import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb } from "react-icons/si"

export default function TechStackStrip() {
    const techItems = [
        { icon: <SiNextdotjs />, label: "Next.js" },
        { icon: <SiTypescript />, label: "TypeScript" },
        { icon: <SiTailwindcss />, label: "Tailwind CSS" },
        { icon: <SiMongodb />, label: "MongoDB" },
    ]

    return (
        <section className="border-y border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
            <div className="container mx-auto relative px-6">
                <p className="mb-6 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                    Built with modern web technologies
                </p>

                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent dark:from-gray-950" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-transparent dark:from-gray-950" />

                <div className="relative flex overflow-x-auto marquee-container">
                    {/* Marquee */}
                    <div className="flex items-center *:pr-16 animate-marquee">
                        {techItems.map((item, i) => (
                            <TechItem key={`set1-${i}`} icon={item.icon} label={item.label} />
                        ))}
                        {techItems.map((item, i) => (
                            <TechItem key={`set2-${i}`} icon={item.icon} label={item.label} />
                        ))}
                    </div>
                    <div aria-hidden className="flex items-center *:pr-16 animate-marquee">
                        {techItems.map((item, i) => (
                            <TechItem key={`set3-${i}`} icon={item.icon} label={item.label} />
                        ))}
                        {techItems.map((item, i) => (
                            <TechItem key={`set4-${i}`} icon={item.icon} label={item.label} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function TechItem({
    icon,
    label,
}: {
    icon: React.ReactNode
    label: string
}) {
    return (
        <div className="flex shrink-0 items-center gap-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
            <span className="text-2xl opacity-80">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}