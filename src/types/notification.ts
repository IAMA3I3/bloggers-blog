export type NotificationStatus = "read" | "unread"

export type Notification = {
    _id: string
    userId: string
    content: string
    status: NotificationStatus
    createdAt: Date
}