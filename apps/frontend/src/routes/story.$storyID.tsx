import {CommentCard} from "@/components/comment-card"
import {FullscreenSpinner} from "@/components/fullscreen-spinner"
import {StoryCard} from "@/components/story-card"
import {getComment, getStory} from "@/services/hn"
import {useQueries, useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/story/$storyID")({
    component: RouteComponent
})

function RouteComponent() {
    const params = Route.useParams()
    const storyID = parseInt(params.storyID)
    const story = useQuery({
        queryKey: ["story", storyID],
        queryFn: () => getStory(storyID)
    })
    const comments = useQueries({
        queries: (story.data?.kids || []).map((id) => ({
            queryKey: ["comment", id],
            queryFn: () => getComment(id)
        }))
    })
    if (!story.data) return <FullscreenSpinner />
    return (
        <div className="flex flex-col">
            <StoryCard story={story.data} full />
            <div>
                {comments.map((comment, i) => (
                    <CommentCard key={story.data?.kids[i]} comment={comment.data} />
                ))}
            </div>
        </div>
    )
}
