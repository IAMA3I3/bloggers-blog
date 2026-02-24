import Link from "next/link";

export default function CreatePostPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} Create
            </h2>
        </>
    )
}