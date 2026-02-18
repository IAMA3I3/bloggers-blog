import { StatsCard } from "../ui/Cards";
import { FaUsers, FaBlog, FaBell } from "react-icons/fa"

export default function Stats() {

    return (
        <div className=" flex gap-8 flex-col md:flex-row *:w-full">
            <StatsCard display icon={<FaUsers />} value={20} text="Users" />
            <StatsCard display icon={<FaBlog />} value={12} text="Posts" />
            <StatsCard display icon={<FaBell />} value={23} text="Notifications" />
        </div>
    )
}