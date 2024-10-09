import type { MarketStatus } from '~/server/types/fx.types'
import { sendServerResponse } from '~/server/utils/response'

export default eventHandler(async (event) => {
    try {

        const base = useRuntimeConfig().fmpUrl
        const key = useRuntimeConfig().fmpKey
        const url = `${base}is-the-market-open?exchange=US&apikey=${key}`
        // const url = `${base}v1/marketstatus/now?apiKey=${key}`
        const resp = await $fetch<MarketStatus>(url, {
            onResponseError({ response }) {
                console.log(response._data)
                throw new Error(response._data)
            }
        })
        setResponseStatus(event, 200)
        return sendServerResponse(200, "success", resp)
    } catch (error) {
        setResponseStatus(event, 500)
        return sendServerResponse(500, `${error}`.includes("fetch failed") ? "fetch failed" : `${error}`)
    }
})
