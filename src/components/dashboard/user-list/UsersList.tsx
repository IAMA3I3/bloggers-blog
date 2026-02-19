import { mockUsers } from "@/temp/usersData"
import UsersListClient from "./UsersList.client"

export default async function UsersList() {

    const users = mockUsers

    return <UsersListClient users={users} />
}
