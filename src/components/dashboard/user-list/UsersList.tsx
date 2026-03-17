import UsersListClient from "./UsersList.client"
import { getCollection } from "@/lib/db"
import { SafeUser, User } from "@/types/auth"
import { WithId } from "mongodb"

const serializeUsers = (users: WithId<User>[]): SafeUser[] => {
    return users.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString()
    }))
}

export default async function UsersList() {

    let users: SafeUser[] = []

    try {
        const usersCollection = await getCollection<User>("users")
        const rawUsers = await usersCollection.find().sort({ createdAt: -1 }).toArray()
        users = serializeUsers(rawUsers)
    } catch (err) {
        throw new Error("Failed to load users")
    }

    return <UsersListClient users={users} />
}
