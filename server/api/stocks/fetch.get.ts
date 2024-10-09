import { format } from 'date-fns'
import type { CountryData, FxPairsData, Timeseries } from '~/server/types/fx.types'
import { createClient } from "@supabase/supabase-js";
import type { News } from '~/server/types/news.types'
import { sendServerResponse } from '~/server/utils/response'
import type { Database } from '~/types/database.types'
import { signJWT } from '~/utils/auth'
const runtimeConfig = useRuntimeConfig()
export default eventHandler(async (event) => {
    const token = signJWT(runtimeConfig.supabaseBotId);
    // initilize supabase client
    const client = await createClient<Database>(
        runtimeConfig.supabaseUrl,
        runtimeConfig.supabaseKey,
        {
            db: {
                schema: "api",
            },
            auth: {
                autoRefreshToken: false,
            },
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        },
    );

    try {
        // get current stocks on database
        const { data, error } = await client.from("TOP STOCKS LIST").select('*')
        if (error) {
            setResponseStatus(event, 500)
            return sendServerResponse(500, error?.message)
        }
        setResponseStatus(event, 200)
        return sendServerResponse(200, "success", data)
    } catch (error) {
        setResponseStatus(event, 500)
        return sendServerResponse(500, `${error}`.includes("fetch failed") ? "fetch failed" : `${error}`)
    }
})
