"use server"

import getAuthUser from "@/lib/auth/getAuthUser"
import { getCollection } from "@/lib/db"
import { escapeRegExp } from "@/utils/escapeRegExp"
import { Post } from "@/types/post"
import { User } from "@/types/auth"
import { Notification } from "@/types/notification"
import { ObjectId } from "mongodb"

export type DashboardSearchResult = {
    users: { id: string, label: string }[]
    posts: { id: string, label: string }[]
    notifications: { id: string, label: string }[]
}

const RESULTS_PER_SECTION = 5

export async function searchDashboard(query: string): Promise<DashboardSearchResult> {
    const authUser = await getAuthUser()
    const empty: DashboardSearchResult = { users: [], posts: [], notifications: [] }

    if (!authUser || query.trim() === "") return empty

    const term = escapeRegExp(query.trim())
    const regex = { $regex: term, $options: "i" }
    const isAdmin = authUser.role === "admin"

    const [users, posts, notifications] = await Promise.all([
        isAdmin
            ? (await getCollection<User>("users"))
                .find({ $or: [{ username: regex }, { email: regex }] })
                .limit(RESULTS_PER_SECTION)
                .toArray()
            : Promise.resolve([]),
        (await getCollection<Post>("posts"))
            .find({
                title: regex,
                ...(isAdmin ? {} : { userId: ObjectId.createFromHexString(authUser.userId) }),
            })
            .limit(RESULTS_PER_SECTION)
            .toArray(),
        (await getCollection<Notification>("notifications"))
            .find({
                userId: ObjectId.createFromHexString(authUser.userId),
                content: regex,
            })
            .limit(RESULTS_PER_SECTION)
            .toArray(),
    ])

    return {
        users: users.map((u) => ({ id: u._id.toString(), label: u.username })),
        posts: posts.map((p) => ({ id: p._id.toString(), label: p.title })),
        notifications: notifications.map((n) => ({ id: n._id.toString(), label: n.content })),
    }
}
