import { PageCard } from "@/components/containers/Cards"
import UserRoleForm from "@/components/forms/UserRoleForm"
import UserStatusForm from "@/components/forms/UserStatusForm"
import { getCollection } from "@/lib/db"
import { SafeUser, User } from "@/types/auth"
import { ObjectId, WithId } from "mongodb"
import Link from "next/link"
import { Suspense } from "react"

type UserEditPageProps = {
    params: Promise<{
        userId: string
    }>
}

const serializeUser = (user: WithId<User>): SafeUser => {
    return { ...user, id: user._id.toString() }
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

    let user: SafeUser

    try {
        const usersCollection = await getCollection<User>("users")
        const rawUser = await usersCollection.findOne({ _id: ObjectId.createFromHexString(id) })
        if (!rawUser) throw new Error("Failed to load user")
        user = serializeUser(rawUser)
    } catch (err) {
        throw new Error("Failed to load user")
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/users"} className=" text-muted hover:text-primary">Users</Link> {"/"} {user.username}
            </h2>
            <PageCard centerAlign>
                <h4 className=" text-center text-xl font-semibold">{user.username}</h4>
                <p className=" text-center font-semibold">{user.email}</p>
                <h6 className=" text-lg text-center mt-8">Role</h6>
                <UserRoleForm userId={user.id} initialRole={user.role} />
                <h6 className=" text-lg text-center mt-8">Status</h6>
                <UserStatusForm userId={user.id} initialStatus={user.status} />
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