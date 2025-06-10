import type {Comment} from "@/services/hn"
import * as fns from "date-fns"

export function CommentCard({comment}: {comment?: Comment}) {
    const dateISO = comment && new Date(comment.time * 1000).toISOString()
    const date = comment && fns.formatDistanceToNow(comment.time * 1000)
    return (
        <div className="flex flex-col">
            <div className="flex">
                <span className="text-sm text-gray-500">{date}</span>
            </div>
        </div>
    )
}
