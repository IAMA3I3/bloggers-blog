type CTAProps = {
    text?: string
    subText?: string
    children?: React.ReactNode
}

export default function CTA({ text, subText, children }: CTAProps) {
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
                       {text}
                    </h2>

                    <p className="mt-4 text-lg text-gray-300">
                        {subText}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}
