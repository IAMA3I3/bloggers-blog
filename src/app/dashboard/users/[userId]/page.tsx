import { PageCard } from "@/components/containers/Cards"
import UserRoleForm from "@/components/forms/UserRoleForm"
import Link from "next/link"
import { Suspense } from "react"

type UserEditPageProps = {
    params: Promise<{
        userId: string
    }>
}

export default async function UserEditPage({ params }: UserEditPageProps) {

    const { userId } = await params

    return (
        <Suspense fallback={<SkeletonLoading />}>
            <RenderUsersEditPage id={userId} />
        </Suspense>
    )
}

async function RenderUsersEditPage({ id }: { id: string }) {

    await new Promise(res => setTimeout(res, 2000))

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/users"} className=" text-muted hover:text-primary">Users</Link> {"/"} {id}
            </h2>
            <PageCard centerAlign>
                <h4 className=" text-center text-xl font-semibold">User_name</h4>
                <p className=" text-center font-semibold">username@gmail.com</p>
                {/* form */}
                <UserRoleForm initialRole={"user"} />
            </PageCard>
        </>
    )
}

function SkeletonLoading() {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/users"} className=" text-muted hover:text-primary">Users</Link> {"/"} <span className=" inline-block text-white/0 bg-muted/50 rounded-lg leading-none animate-pulse">text</span>
            </h2>
            <div className=" mx-auto w-full relative overflow-hidden text-center max-w-150 p-6 rounded-lg border-2 border-gray-100 dark:border-slate-800 dark:shadow-black/70 shadow-lg">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer">
                        <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/60 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                    </div>
                </div>
                <h4 className=" inline-block text-xl font-semibold text-white/0 bg-muted/50 rounded-lg leading-none">User_name</h4>
                <br />
                <p className=" inline-block text-center font-semibold text-white/0 bg-muted/50 rounded-lg leading-none">username@gmail.com</p>
                <br />
                <div className=" mt-8">
                    <div className=" w-full bg-transparent py-2 px-4 rounded-full text-white/0 border-2 border-muted/50">kk</div>
                    <div className=" mt-4 flex justify-center">
                        <div className=" py-2 px-6 text-sm leading-none text-white/0 bg-muted/50 rounded-full">Update Role</div>
                    </div>
                </div>
            </div>
        </>
    )
}