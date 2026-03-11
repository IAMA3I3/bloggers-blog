import getAuthUser from "@/lib/auth/getAuthUser";
import NavbarClient from "./Navbar.client";

export default async function Navbar() {
    const authUser = await getAuthUser()

    return <NavbarClient authUser={authUser} />
}