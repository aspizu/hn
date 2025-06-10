import type {Comment} from "@/services/hn"
import * as fns from "date-fns"

function CommentText({text}: {text: string}) {
    return (
        <div
            className="prose prose-sm prose-p:my-2 prose-a:text-primary/70 prose-a:font-semibold prose-a:no-underline prose-a:transition-all prose-a:duration-200 hover:prose-a:underline hover:prose-a:text-primary/90 focus:prose-a:outline-2 focus:prose-a:outline-offset-2 focus:prose-a:outline-primary/50 max-w-none"
            dangerouslySetInnerHTML={{__html: text}}
        />
    )
}

export function CommentCard({comment, depth = 0}: {comment?: Comment; depth?: number}) {
    if (!comment) return null

    const dateISO = new Date(comment.time * 1000).toISOString()
    const date = fns.formatDistanceToNow(comment.time * 1000)
    const hasReplies = comment.kids && comment.kids.length > 0

    return (
        <div className="flex">
            {depth > 0 && (
                <div className="mr-4 flex">
                    {Array.from({length: depth}).map((_, i) => (
                        <div key={i} className="border-border/50 w-6 border-r" />
                    ))}
                </div>
            )}
            <div className="flex-1 px-3 py-3">
                <div className="space-y-2">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <span className="text-foreground text-xs font-medium">
                            {comment.by}
                        </span>
                        <span>•</span>
                        <time dateTime={dateISO} title={dateISO} className="text-xs">
                            {date} ago
                        </time>
                        {hasReplies && (
                            <>
                                <span>•</span>
                                <span className="text-xs">
                                    {comment.kids.length}{" "}
                                    {comment.kids.length === 1 ? "reply" : "replies"}
                                </span>
                            </>
                        )}
                    </div>
                    <CommentText text={comment.text} />
                </div>
            </div>
        </div>
    )
}
