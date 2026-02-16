import { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
    {
        _id: "n1",
        userId: "user_1",
        content: "Your post \"Getting Started with Modern React Development\" received a new comment.",
        status: "unread",
        createdAt: new Date("2024-10-12T10:05:00"),
    },
    {
        _id: "n2",
        userId: "user_1",
        content: "Your post \"Exploring the Next.js App Router\" was marked as featured.",
        status: "read",
        createdAt: new Date("2024-09-16T09:20:00"),
    },
    {
        _id: "n3",
        userId: "user_2",
        content: "You have a new follower.",
        status: "unread",
        createdAt: new Date("2024-09-05T12:15:00"),
    },
    {
        _id: "n4",
        userId: "user_3",
        content: "Your comment on \"Understanding Clean Architecture\" received a reply.",
        status: "read",
        createdAt: new Date("2024-08-19T15:30:00"),
    },
    {
        _id: "n5",
        userId: "user_4",
        content: "Your post \"Morning Habits That Boost Daily Output\" has 10 new views.",
        status: "unread",
        createdAt: new Date("2024-06-10T13:00:00"),
    },
    {
        _id: "n6",
        userId: "user_5",
        content: "Your post \"Designing Systems That Scale\" was added to bookmarks.",
        status: "read",
        createdAt: new Date("2024-02-02T14:20:00"),
    },
    {
        _id: "n7",
        userId: "user_1",
        content: "Your profile was successfully updated.",
        status: "read",
        createdAt: new Date("2024-01-10T08:45:00"),
    },
    {
        _id: "n8",
        userId: "user_6",
        content: "Your post \"Random Lessons Learned from Software Engineering\" received a like.",
        status: "unread",
        createdAt: new Date("2023-06-11T11:30:00"),
    },
]