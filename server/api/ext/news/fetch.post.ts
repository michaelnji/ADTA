import { format } from 'date-fns'
import type { News } from '~/server/types/news.types'
import { sendServerResponse } from '~/server/utils/response'

export default eventHandler(async (event) => {
    try {
        const apiKey = useRuntimeConfig().marketauxKey
        const base = useRuntimeConfig().marketauxUrl
        const body = await readBody(event)
        const today = format(new Date(), 'yyyy-MM-dd')
        const limit = body.limit ?? 2
        const searchString = getNewsSearchString(body.category)
        const url = `${base}news/all?language=en&limit=${limit}&exclude_domains=medium.com&published_on=${today}&search=${searchString}&api_token=${apiKey}`
        const resp = await $fetch<News>(url, {
            onResponseError({ response }) {
                throw new Error(response._data)
            }
        })
        setResponseStatus(event, 200)
        return sendServerResponse(200, "success", resp.data)
    } catch (error) {
        setResponseStatus(event, 500)
        return sendServerResponse(500, `${error}`.includes("fetch failed") ? "fetch failed" : `${error}`)
    }
})
