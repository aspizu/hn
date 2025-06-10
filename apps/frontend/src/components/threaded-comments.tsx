import {CommentCard} from "@/components/comment-card"
import {getComment} from "@/services/hn"
import {useQueries} from "@tanstack/react-query"

function CommentThread({commentId, depth = 0}: {commentId: number; depth?: number}) {
    const commentQuery = useQueries({
        queries: [
            {
                queryKey: ["comment", commentId],
                queryFn: () => getComment(commentId)
            }
        ]
    })[0]

    const comment = commentQuery.data
    if (!comment) return null

    return (
        <div>
            <CommentCard comment={comment} depth={depth} />
            {comment.kids && comment.kids.length > 0 && (
                <div>
                    {comment.kids.map((childId) => (
                        <CommentThread
                            key={childId}
                            commentId={childId}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export function ThreadedComments({commentIds}: {commentIds: number[]}) {
    return (
        <div>
            {commentIds.map((commentId) => (
                <CommentThread key={commentId} commentId={commentId} depth={0} />
            ))}
        </div>
    )
}
