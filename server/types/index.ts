
import type { Quote12, Stock } from '~/types/index.types.js'
import type { CountryData, FxPairsData, MarketStatus, Timeseries } from './fx.types.js'
import type { News } from './news.types.ts'
export type StatusCode = 200 | 400 | 404 | 403 | 500 | 401
export type ErrorCodes = (400 | 404 | 403 | 500 | 401)
export type ServerData = News["data"] | CountryData["data"] | FxPairsData["data"] | Timeseries["values"] | Stock[] | Quote12 | MarketStatus
export interface ServerResponse<Status extends StatusCode, Data extends ServerData> {
    status: Status
    message?: string
    ok: Status extends 200 ? true : false
    data?: Status extends 200 ? Data : null
    error?: Status extends 200 ? null : string
}