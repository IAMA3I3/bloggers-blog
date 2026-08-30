import NotificationsListClient from "./NotificationsList.client"
import { getAllNotifications } from "@/actions/notification"

export default async function NotificationsList() {
    const notifications = await getAllNotifications()

    return <NotificationsListClient notifications={notifications} />
}
