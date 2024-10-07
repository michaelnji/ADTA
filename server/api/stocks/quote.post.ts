import { format } from 'date-fns'
import type { CountryData, FxPairsData, Timeseries } from '~/server/types/fx.types'
import { createClient } from "@supabase/supabase-js";
import type { News } from '~/server/types/news.types'
import { sendServerResponse } from '~/server/utils/response'
import type { Database } from '~/types/database.types'
import { signJWT } from '~/utils/auth'
import type { Quote12 } from '~/types/index.types';
const runtimeConfig = useRuntimeConfig()
export default eventHandler(async (event) => {

    try {
        const body = await readBody(event)
        const url = `${runtimeConfig.public.twelveUrl}/quote?symbol=${body.displaySymbol}&apikey=${runtimeConfig.twelveKey}`;
        const currentStock = await $fetch<Quote12>(url, {
            method: "GET",

            onResponseError({ response }) {
                throw new Error(response._data)
            },
        });

        setResponseStatus(event, 200)
        return sendServerResponse(200, "success", currentStock)
    } catch (error) {
        setResponseStatus(event, 500)
        return sendServerResponse(500, `${error}`.includes("fetch failed") ? "fetch failed" : `${error}`)
    }
})
