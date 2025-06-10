import {cn} from "@/lib/utils"
import type {Story} from "@/services/hn"
import {getLinkPreview} from "@/services/link-preview"
import {useQuery} from "@tanstack/react-query"
import {Link} from "@tanstack/react-router"
import * as fns from "date-fns"

function StoryURL({url}: {url: string}) {
    const urlObject = new URL(url)
    return (
        <a
            className="group text-primary/40 hover:text-primary/75 active:text-primary/25 mr-auto text-sm transition-colors"
            href={url}
        >
            {urlObject.protocol}//
            <span className="text-primary/65 group-hover:text-primary/75">
                {urlObject.hostname}
            </span>
            {urlObject.pathname !== "/" ? urlObject.pathname : ""}
            {urlObject.search ? urlObject.search : ""}
            {urlObject.hash ? urlObject.hash : ""}
        </a>
    )
}

export function StoryCard({story, full}: {story?: Story; full?: true}) {
    const preview = useQuery({
        queryKey: ["meta", story?.id],
        queryFn: () => getLinkPreview(story!.url!),
        enabled: Boolean(story?.url)
    })
    const dateISO = story && new Date(story.time * 1000).toISOString()
    const date = story && fns.formatDistanceToNow(story.time * 1000)
    return (
        <div
            className="flex flex-col"
            style={{
                backgroundImage: `url(${preview.data?.image})`
            }}
        >
            <div
                className={cn(
                    "bg-transparent transition-colors",
                    !full && "hover:bg-white/25"
                )}
            >
                <div
                    className={cn(
                        "bg-gradient-to-t from-black/80 to-black/50 p-4",
                        full && "pt-32"
                    )}
                >
                    <Link
                        to="/story/$storyID"
                        params={{storyID: String(story?.id)}}
                        className="hover:decoration-primary font-semibold underline decoration-transparent decoration-[1.5px] underline-offset-[1.5px] transition-colors"
                    >
                        {story?.title}
                    </Link>
                    <div className="flex">
                        {story?.url && <StoryURL url={story?.url} />}
                        <time
                            className="text-primary/40 ml-auto text-sm"
                            dateTime={dateISO}
                            title={dateISO}
                        >
                            {date}
                        </time>
                    </div>
                </div>
            </div>
        </div>
    )
}
