import { PageCard } from "@/components/containers/Cards"
import { mockNotifications } from "@/temp/notificationData"
import { formatPostDate } from "@/utils/formatPostDate"
import Link from "next/link"
import { Suspense } from "react"

type NotificationDetailProps = {
    params: Promise<{
        notificationId: string
    }>
}

export default async function NotificationDetail({ params }: NotificationDetailProps) {

    const { notificationId } = await params

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 truncate">
                <Link href={"/dashboard/notifications"} className=" text-muted hover:text-primary">Notifications</Link> {"/"} Detail
            </h2>
            <Suspense fallback={<SkeletonLoading />}>
                <NotificationDetailMain id={notificationId} />
            </Suspense>
        </>
    )
}

async function NotificationDetailMain({ id }: { id: string }) {
    await new Promise(res => setTimeout(res, 2000))
    const notification = mockNotifications[0]

    return (
        <PageCard centerAlign>
            <p className=" text-muted text-sm font-semibold mb-4">{formatPostDate(notification.createdAt)}</p>
            <p>{notification.content}</p>
        </PageCard>
    )
}

function SkeletonLoading() {
    return (
        <div className=" mx-auto w-full relative overflow-hidden max-w-150 p-6 rounded-lg border-2 border-gray-100 dark:border-slate-800 dark:shadow-black/70 shadow-lg">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 -translate-x-full animate-shimmer">
                    <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/60 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                </div>
            </div>
            <p className=" inline-block text-sm font-semibold mb-4 text-white/0 bg-muted/50 rounded-lg leading-none">Lorem, ipsum.</p>
            <p className=" text-white/0 bg-muted/50 rounded-lg leading-none mb-2">text</p>
            <p className=" w-1/2 text-white/0 bg-muted/50 rounded-lg leading-none">text</p>
        </div>
    )
}