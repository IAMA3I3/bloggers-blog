"use server"

import getAuthUser from "@/lib/auth/getAuthUser"
import { getCollection } from "@/lib/db"
import { Notification, SafeNotification } from "@/types/notification"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"

// Not exposed as a form action — called from other server actions (post
// suspend/restore/feature, new comment) to record an in-app notification.
// Best-effort: a failed notification insert shouldn't break the action that
// triggered it.
export async function createNotification(userId: string, content: string, link?: string) {
    try {
        const notificationsCollection = await getCollection<Notification>("notifications")
        await notificationsCollection.insertOne({
            _id: new ObjectId(),
            userId: ObjectId.createFromHexString(userId),
            content,
            link,
            status: "unread",
            createdAt: new Date(),
        })
    } catch {
        // non-critical
    }
}

const serializeNotifications = (notifications: Notification[]): SafeNotification[] => {
    return notifications.map(({ _id, userId, ...rest }) => ({ ...rest, id: _id.toString(), userId: userId.toString() }))
}

export async function getRecentNotifications(limit = 5): Promise<{ notifications: SafeNotification[], unreadCount: number }> {
    const authUser = await getAuthUser()
    if (!authUser) return { notifications: [], unreadCount: 0 }

    try {
        const notificationsCollection = await getCollection<Notification>("notifications")
        const filter = { userId: ObjectId.createFromHexString(authUser.userId) }

        const [notifications, unreadCount] = await Promise.all([
            notificationsCollection.find(filter).sort({ createdAt: -1 }).limit(limit).toArray(),
            notificationsCollection.countDocuments({ ...filter, status: "unread" }),
        ])

        return { notifications: serializeNotifications(notifications), unreadCount }
    } catch {
        return { notifications: [], unreadCount: 0 }
    }
}

export async function getAllNotifications(): Promise<SafeNotification[]> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const notificationsCollection = await getCollection<Notification>("notifications")
    const notifications = await notificationsCollection
        .find({ userId: ObjectId.createFromHexString(authUser.userId) })
        .sort({ createdAt: -1 })
        .toArray()

    return serializeNotifications(notifications)
}

export async function getNotificationById(id: string): Promise<SafeNotification | null> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const notificationsCollection = await getCollection<Notification>("notifications")
    const notification = await notificationsCollection.findOne({
        _id: ObjectId.createFromHexString(id),
        userId: ObjectId.createFromHexString(authUser.userId),
    })

    if (!notification) return null

    return serializeNotifications([notification])[0]
}

export async function markNotificationReadAction(notificationId: string) {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const notificationsCollection = await getCollection<Notification>("notifications")
    await notificationsCollection.updateOne(
        { _id: ObjectId.createFromHexString(notificationId), userId: ObjectId.createFromHexString(authUser.userId) },
        { $set: { status: "read" } }
    )
}

export async function markAllNotificationsReadAction() {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const notificationsCollection = await getCollection<Notification>("notifications")
    await notificationsCollection.updateMany(
        { userId: ObjectId.createFromHexString(authUser.userId), status: "unread" },
        { $set: { status: "read" } }
    )
}
