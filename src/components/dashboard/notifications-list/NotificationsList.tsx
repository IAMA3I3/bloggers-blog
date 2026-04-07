// import { mockNotifications } from "@/temp/notificationData"
import NotificationsListClient from "./NotificationsList.client"
import { Notification } from "@/types/notification"

export default async function NotificationsList() {

    await new Promise(res => setTimeout(res, 2000))

    // const notifications = mockNotifications
    const notifications: Notification[] = []

    return <NotificationsListClient notifications={notifications} />
}