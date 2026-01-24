import type { Giphiresponce } from "../interfaces/gifi.response"
import type { Gif } from "../interfaces/gif.interfaces"
import { giphyApi } from "../api/giphy.api"

export const getgiftbyquery = async (query: string): Promise<Gif[]> => {

    const response = await giphyApi<Giphiresponce>('/search', {
        params: {
            q: query,
            limit: 10,
        }
    })

    return response.data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        width: Number(gif.images.original.width),
        height: Number(gif.images.original.height)
    }))
}