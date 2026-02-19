import { mockUsers } from "@/temp/usersData"
import UsersListClient from "./UsersList.client"

export default async function UsersList() {

    await new Promise(res => setTimeout(res, 2000))

    const users = mockUsers

    return <UsersListClient users={users} />
}
