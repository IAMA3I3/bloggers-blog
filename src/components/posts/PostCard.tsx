type HeroPostCardProps = {
    category: PostCategory
    title: string
    content: string

}

import { PostCategory } from "@/types/post"
import { BasicCard } from "../containers/Cards"

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