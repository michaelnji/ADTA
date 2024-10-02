import { format } from 'date-fns'
import type { CountryData, FxPairsData } from '~/server/types/fx.types'
import type { News } from '~/server/types/news.types'
import { sendServerResponse } from '~/server/utils/response'

export default eventHandler(async (event) => {
    try {

        const base = useRuntimeConfig().public.twelveUrl
        const url = `${base}/forex_pairs`
        const resp = await $fetch<FxPairsData>(url, {
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
