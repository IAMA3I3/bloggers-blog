import { ObjectId } from "mongodb"

export type NotificationStatus = "read" | "unread"

export type Notification = {
    _id: ObjectId
    userId: ObjectId
    content: string
    link?: string
    status: NotificationStatus
    createdAt: Date
}

export type SafeNotification = Omit<Notification, "_id" | "userId"> & { id: string, userId: string }
