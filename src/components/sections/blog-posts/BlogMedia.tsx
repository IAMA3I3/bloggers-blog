import { Post } from "@/types/post"

type BlogMediaProps = {
    media: Post['media']
}

export default function BlogMedia({ media }: BlogMediaProps) {
    if (!media || media.length === 0) return null

    const imageMedia = media.filter(item => item.type === 'image')

    if (imageMedia.length === 0) return null

    // Single image - full width hero
    if (imageMedia.length === 1) {
        return (
            <div className="my-8 container px-6 mx-auto">
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
                    <img
                        src={imageMedia[0].url}
                        alt={imageMedia[0].filename || "Blog post image"}
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                </div>
            </div>
        )
    }

    // Two images - side by side on desktop, stacked on mobile
    if (imageMedia.length === 2) {
        return (
            <div className="my-8 container px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {imageMedia.map((item, index) => (
                        <div
                            key={index}
                            className="w-full aspect-4/3 rounded-xl overflow-hidden border border-border shadow-lg"
                        >
                            <img
                                src={item.url}
                                alt={item.filename || `Blog image ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Three or more images - masonry-style grid
    return (
        <div className="my-8 container px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* First image spans 2 columns */}
                <div className="col-span-2 w-full aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
                    <img
                        src={imageMedia[0].url}
                        alt={imageMedia[0].filename || "Featured blog image"}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="eager"
                    />
                </div>

                {/* Remaining images in grid */}
                {imageMedia.slice(1).map((item, index) => (
                    <div
                        key={index + 1}
                        className="w-full aspect-square rounded-xl overflow-hidden border border-border shadow-lg"
                    >
                        <img
                            src={item.url}
                            alt={item.filename || `Blog image ${index + 2}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}