import {FullscreenSpinner} from "@/components/fullscreen-spinner"
import {StoryCard} from "@/components/story-card"
import {ThreadedComments} from "@/components/threaded-comments"
import {getStory} from "@/services/hn"
import {useQuery} from "@tanstack/react-query"
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
    if (!story.data) return <FullscreenSpinner />
    return (
        <div className="flex flex-col">
            <StoryCard story={story.data} full />
            <ThreadedComments commentIds={story.data.kids || []} />
        </div>
    )
}
