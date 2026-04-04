import { getCollection } from "@/lib/db";
import { StatsCard } from "../ui/Cards";
import { FaUsers, FaBlog, FaBell } from "react-icons/fa"
import { User } from "@/types/auth";
import getAuthUser from "@/lib/auth/getAuthUser";
import { Post } from "@/types/post";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Stats() {

    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    let userCount: number = 0
    let postsCount: number = 0

    try {
        const userCollection = await getCollection<User>("users")
        const postsCollection = await getCollection<Post>("posts")
        userCount = await userCollection.countDocuments()
        postsCount = authUser.role === "admin" ? await postsCollection.countDocuments() : await postsCollection.countDocuments({ userId: ObjectId.createFromHexString(authUser.userId) })
    } catch (err) {
        throw new Error("Failed to load stats")
    }

    return (
        <div className=" flex gap-8 flex-col md:flex-row *:w-full">
            {
                authUser.role === "admin" && (
                    <StatsCard display icon={<FaUsers />} value={userCount} text="Users" />
                )
            }
            <StatsCard display icon={<FaBlog />} value={postsCount} text="Posts" />
            <StatsCard display icon={<FaBell />} value={23} text="Notifications" />
        </div>
    )
}