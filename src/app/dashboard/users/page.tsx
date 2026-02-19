import UsersList from "@/components/dashboard/user-list/UsersList";
import { Suspense } from "react";

export default function UsersPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                Users
            </h2>
            {/* users list */}
            <Suspense fallback={<SkeletonLoading />}>
                <UsersList />
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
                                <p className=" text-xs font-semibold inline-block text-white/0 bg-muted/50 rounded-lg leading-none">text</p>
                                <br />
                                <h6 className=" font-semibold inline-block text-white/0 bg-muted/50 rounded-lg leading-none">Lorem, ipsum.</h6>
                                <br />
                                <p className=" text-sm inline-block text-white/0 bg-muted/50 rounded-lg leading-none">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div className=" flex gap-4 items-center flex-nowrap">
                                <div className=" text-xs font-semibold py-2 px-6 leading-none text-white/0 bg-muted/50 rounded-lg">k</div>
                                <div className=" text-xs font-semibold py-2 px-6 leading-none text-white/0 bg-muted/50 rounded-lg">k</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}