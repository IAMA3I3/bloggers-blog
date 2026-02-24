import NotificationsList from "@/components/dashboard/notifications-list/NotificationsList";
import NotificationsFilter from "@/components/dashboard/NotificationsFilter";
import { Suspense } from "react";

export default function NotificationsPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                Notifications
            </h2>
            <NotificationsFilter />
            <Suspense fallback={<SkeletonLoading />}>
                <NotificationsList />
            </Suspense>
        </>
    )
}

function SkeletonLoading() {
    return (
        <div className=" space-y-4">
            {
                [1, 2, 3, 4, 5].map(i => (
                    <div key={i} className=" p-5 rounded-xl relative overflow-hidden border border-border backdrop-blur-sm shadow-lg dark:shadow-black/50 group">
                        {/* Shimmer effect overlay */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer">
                                <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/60 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                            </div>
                        </div>

                        <div className=" flex flex-col md:flex-row gap-4 items-center">
                            <div className=" w-full flex-1 overflow-hidden text-center md:text-left">
                                <p className=" text-xs font-semibold inline-block text-white/0 bg-muted/50 rounded-lg leading-none">text text</p>
                                <br />
                                <h6 className=" font-semibold inline-block text-white/0 bg-muted/50 rounded-lg leading-none">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem fugiat facere impedit corporis totam deleniti quos?</h6>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}