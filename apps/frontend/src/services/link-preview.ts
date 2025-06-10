export interface LinkPreview {
    title?: string
    description?: string
    canonical?: string
    language?: string
    rss?: string
    image?: string
    amp?: string
    author?: string
    date?: string
    metatags?: Metatag[]
}

export interface Metatag {
    name: string
    content: string
}

export async function getLinkPreview(url: string): Promise<LinkPreview | null> {
    const base = import.meta.env.VITE_LINK_PREVIEW_SERVICE_URL
    const response = await fetch(`${base}/link_preview?url=${encodeURIComponent(url)}`)
    if (!response.ok) return null
    return (await response.json()) as LinkPreview
}
