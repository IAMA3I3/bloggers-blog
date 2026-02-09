import { BasicCard } from "../containers/Cards"

export default function Values() {

    return (
        <section className=" py-12 container px-6 mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
            {
                values.map(value => (
                    <BasicCard key={value.title}>
                        <h3 className=" text-xl font-medium">{value.title}</h3>
                        <p className=" mt-3 text-sm">{value.text}</p>
                    </BasicCard>
                ))
            }
        </section>
    )
}

const values = [
    {
        title: "Clarity over noise",
        text: "A calm interface that helps readers focus and writers think clearly.",
    },
    {
        title: "Built for writers",
        text: "Every feature exists to support writing, publishing, and reading.",
    },
    {
        title: "Fast by default",
        text: "Performance, accessibility, and simplicity are first-class citizens.",
    },
]