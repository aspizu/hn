import {FullscreenSpinner} from "@/components/fullscreen-spinner"
import {StoryCard} from "@/components/story-card"
import {getStory, getTopStoryIds} from "@/services/hn"
import {useQueries, useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/")({component: RouteComponent})

function RouteComponent() {
    const topStoriesIDs = useQuery({queryKey: ["topstories"], queryFn: getTopStoryIds})

    const topStories = useQueries({
        queries:
            topStoriesIDs.data?.map((id) => ({
                queryKey: ["story", id],
                queryFn: () => getStory(id)
            })) ?? []
    })

    if (topStoriesIDs.isLoading) return <FullscreenSpinner />

    return (
        <div className="flex flex-col">
            {topStories.map((story, i) => {
                const storyID = topStoriesIDs.data?.[i]
                return <StoryCard key={storyID} story={story?.data} />
            })}
        </div>
    )
}
