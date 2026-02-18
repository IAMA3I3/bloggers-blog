import { BasicCard } from "../containers/Cards";
import { LinkListItem } from "../ui/ListItem";

export default function QuickLinks() {

    return (
        <BasicCard noBackground>
            <h3 className="text-base sm:text-lg font-semibold mb-1">
                Quick Links
            </h3>
            <div className=" space-y-2">
                <LinkListItem shadow href={"/dashboard/posts/create"} text="Add Posts" />
                <LinkListItem shadow href={"/dashboard/posts"} text="Posts" />
                <LinkListItem shadow href={"/dashboard/profile"} text="Profile" />
                <LinkListItem shadow href={"/dashboard/notifications"} text="Notifications" />
            </div>
        </BasicCard>
    )
}