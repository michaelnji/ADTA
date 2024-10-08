import type { MarketStatus } from '~/server/types/fx.types'
import { sendServerResponse } from '~/server/utils/response'

export default eventHandler(async (event) => {
    try {

        const base = useRuntimeConfig().public.polygonUrl
        const url = `${base}v1/marketstatus/now?apiKey=${useRuntimeConfig().polygonKey}`
        const resp = await $fetch<MarketStatus>(url, {
            onResponseError({ response }) {
                throw new Error(response._data)
            }
        })
        console.log(resp)
        setResponseStatus(event, 200)
        return sendServerResponse(200, "success", resp)
    } catch (error) {
        setResponseStatus(event, 500)
        return sendServerResponse(500, `${error}`.includes("fetch failed") ? "fetch failed" : `${error}`)
    }
})
