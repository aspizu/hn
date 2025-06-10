export interface Story {
    by: string
    descendants: number
    id: number
    kids: number[]
    score: number
    time: number
    title: string
    type: string
    url?: string
}

export interface Comment {
    id: number
    by: string
    kids: number[]
    parent: number
    text: string
    time: number
    type: "comment"
}

const BASE_URL = "https://hacker-news.firebaseio.com/v0"

async function getObject<T>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
    return await res.json()
}

export async function getTopStoryIds(): Promise<number[]> {
    return getObject<number[]>(`${BASE_URL}/topstories.json`)
}

export async function getStory(id: number): Promise<Story> {
    return getObject<Story>(`${BASE_URL}/item/${id}.json`)
}

export async function getComment(id: number): Promise<Comment> {
    return getObject<Comment>(`${BASE_URL}/item/${id}.json`)
}
