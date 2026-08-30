import { FaUser } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";

type HeroPostCardProps = {
    category: PostCategory
    title: string
    content: string

}

import { PostCategory, PostMedia } from "@/types/post"
import { BasicCard } from "../containers/Cards"
import LikeButton from "./LikeButton"
import Link from "next/link";
import { formatPostDate } from "@/utils/formatPostDate";
import { defaultMedia } from "@/utils/appStore";
import { cldUrl } from "@/utils/cloudinaryUrl";
import { CATEGORY_BADGE_COLOR } from "@/utils/categoryStyles";

export const HeroPostCard = ({ category, title, content }: HeroPostCardProps) => {

    return (
        <BasicCard>
            <span
                className={`
                    ${category === "web-development" && " text-indigo-500! dark:text-indigo-400!"}
                    ${category === "productivity" && " text-emerald-600! dark:text-emerald-400!"}
                    ${category === "architecture" && " text-rose-600! dark:text-rose-400!"}
                    text-xs font-medium text-muted capitalize
                `}
            >
                {category.replace("-", " ")}
            </span>
            <h3 className="mt-2 text-base font-semibold text-foreground">
                {title}
            </h3>
            <p className="mt-2 text-sm text-muted line-clamp-2">
                {content}
            </p>
        </BasicCard>
    )
}

type FeaturedPostCardProps = {
    variant?: "primary" | "secondary"
    category: PostCategory
    media?: PostMedia[]
    id: string
    slug: string
    title: string
    content: string
    authorName: string
    createdAt: Date
    likes?: string[]
    currentUserId?: string
}

export const FeaturedPostCard = ({ variant = "primary", category, media = [defaultMedia], id, slug, title, content, authorName, createdAt, likes = [], currentUserId }: FeaturedPostCardProps) => {

    if (media.length === 0) {
        media = [defaultMedia]
    }

    return (
        <BasicCard noPadding>
            <div
                className={`
                    ${variant === "primary" ? " h-100" : ""}
                    ${variant === "secondary" ? " h-45" : ""}
                    relative w-full overflow-hidden bg-black
                `}
            >
                {
                    media[0].type === "image" ? (
                        <img src={cldUrl(media[0].url, "f_auto,q_auto,w_800")} alt={media[0].filename} className=" w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                    ) : (
                        <video src={media[0].url} autoPlay loop muted className=" w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                    )
                }
                <div className=" absolute top-4 left-4">
                    <span
                        className={`
                            ${CATEGORY_BADGE_COLOR[category]}
                            text-xs font-semibold text-white capitalize py-1 px-3 rounded-full shadow-sm
                        `}
                    >
                        {category.replace("-", " ")}
                    </span>
                </div>
                <div className=" absolute top-4 right-4">
                    <LikeButton
                        postId={id}
                        initialLiked={!!currentUserId && likes.includes(currentUserId)}
                        initialCount={likes.length}
                        requireAuth={!currentUserId}
                    />
                </div>
                <div
                    className={`
                        ${variant === "primary" ? " pt-12" : ""}
                        absolute bottom-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent from-70% text-white
                    `}
                >
                    <Link
                        href={`/blog/${slug}`}
                        className={`
                            ${variant === "primary" ? "text-xl" : " truncate w-full"}
                            mb-2 inline-block hover:text-primary
                        `}
                    >
                        {title}
                    </Link>
                    {variant === "primary" && <p className=" mb-4 text-sm line-clamp-2">{content}</p>}
                    <div className=" flex items-center flex-wrap gap-4 text-xs font-semibold">
                        <div className=" flex items-center gap-2">
                            <FaUser />
                            <span>{authorName}</span>
                        </div>
                        <div className=" flex items-center gap-2">
                            <MdOutlineAccessTime />
                            <span>{formatPostDate(createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </BasicCard>
    )
}