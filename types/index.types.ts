import type { Database } from "./database.types";

export type Stock = {
    displaySymbol: string;
    float: string | null;
    id: string;
    perc_chnge: string | null;
    points: number | null;
    position: number | null;
    previous_close: string | null;
    rv: string | null;
    sentiment: string | null;
    volume: string;
    year_high: string | null;
    year_low: string | null;
};

export interface Quote12 {
    "symbol": string,
    "name": string,
    "exchange": string,
    "mic_code": string,
    "currency": string,
    "datetime": string,
    "timestamp": number,
    "open": string,
    "high": string,
    "low": string,
    "close": string,
    "volume": string,
    "previous_close": string,
    "change": string,
    "percent_change": string,
    "average_volume": string,
    "rolling_1d_change": string,
    "rolling_7d_change": string,
    "rolling_period_change": string
    "is_market_open": boolean,
    "fifty_two_week": {
        "low": string,
        "high": string,
        "low_change": string,
        "high_change": string,
        "low_change_percent": string,
        "high_change_percent": string,
        "range": string
    },
    "extended_change": string,
    "extended_percent_change": string,
    "extended_price": string,
    "extended_timestamp": number
}