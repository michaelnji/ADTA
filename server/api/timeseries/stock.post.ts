import { format } from 'date-fns'
import type { CountryData, FxPairsData, Timeseries } from '~/server/types/fx.types'
import type { News } from '~/server/types/news.types'
import { sendServerResponse } from '~/server/utils/response'

export default eventHandler(async (event) => {
    try {

        const base = useRuntimeConfig().public.twelveUrl
        const key = useRuntimeConfig().twelveKey
        const body = await readBody(event)
        const url = `${base}/time_series?symbol=${body.symbol}&interval=${body.interval}&date=${body.date}&timezone=Africa/Lagos&apikey=${key}`
        const resp = await $fetch<Timeseries>(url, {
            onResponseError({ response }) {
                throw new Error(response._data)
            }
        })
        if (resp.status === 'error' && resp.message) {
            setResponseStatus(event, 500)
            return sendServerResponse(500, resp.message)
        }

        setResponseStatus(event, 200)
        return sendServerResponse(200, "success", resp.values)
    } catch (error) {
        setResponseStatus(event, 500)
        return sendServerResponse(500, `${error}`.includes("fetch failed") ? "fetch failed" : `${error}`)
    }
})
