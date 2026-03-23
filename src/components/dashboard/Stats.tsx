import { getCollection } from "@/lib/db";
import { StatsCard } from "../ui/Cards";
import { FaUsers, FaBlog, FaBell } from "react-icons/fa"
import { User } from "@/types/auth";
import getAuthUser from "@/lib/auth/getAuthUser";

export default async function Stats() {

    const authUser = await getAuthUser()

    let userCount: number = 0

    try {
        const userCollection = await getCollection<User>("users")
        userCount = await userCollection.countDocuments()
    } catch (err) {
        throw new Error("Failed to load users")
    }

    return (
        <div className=" flex gap-8 flex-col md:flex-row *:w-full">
            {
                authUser?.role === "admin" && (
                    <StatsCard display icon={<FaUsers />} value={userCount} text="Users" />
                )
            }
            <StatsCard display icon={<FaBlog />} value={12} text="Posts" />
            <StatsCard display icon={<FaBell />} value={23} text="Notifications" />
        </div>
    )
}