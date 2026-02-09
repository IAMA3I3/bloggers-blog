import { Button } from "../ui/Button";

export default function Creator() {

    return (
        <section className=" py-12 container px-6 mx-auto">
            <h2 className=" text-2xl font-semibold">Built by</h2>
            <p className=" mt-4 max-w-2xl">
                Bloggers Blog is designed and built by Abdulazeez Salami, a
                developer focused on building thoughtful, high-quality web
                experiences with modern technologies.
            </p>
            <div className=" mt-6">
                <a
                    href="https://abdulazeezsalami.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" inline-block"
                >
                    <Button text="View portfolio" rounded outlined />
                </a>
            </div>
        </section>
    )
}