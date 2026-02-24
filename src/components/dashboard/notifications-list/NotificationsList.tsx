import { mockNotifications } from "@/temp/notificationData"
import NotificationsListClient from "./NotificationsList.client"

export default async function NotificationsList() {

    await new Promise(res => setTimeout(res, 2000))

    const notifications = mockNotifications

    return <NotificationsListClient notifications={notifications} />
}