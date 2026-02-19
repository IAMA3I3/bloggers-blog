import UsersList from "@/components/dashboard/user-list/UsersList";
import { Suspense } from "react";

export default function UsersPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                Users
            </h2>
            {/* users list */}
            <Suspense fallback={"Loading..."}>
                <UsersList />
            </Suspense>
        </>
    )
}