import { PageCard } from "@/components/containers/Cards";
import PostForm from "@/components/forms/PostForm";
import Link from "next/link";

export default function CreatePostPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} Create
            </h2>
            <PageCard centerAlign>
                <h3 className=" text-center text-2xl mb-4">Create a Post</h3>
                {/* post form */}
                <PostForm />
                <p className=" text-xs text-muted text-center mt-4">By creating a post, you agree to our <Link href={"/terms"} className=" underline hover:text-primary">terms & conditions</Link></p>
            </PageCard>
        </>
    )
}