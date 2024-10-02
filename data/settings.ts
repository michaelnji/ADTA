export const strategies = {
    stocks: {
        prefered_country: ["US", "CA", "UK", "CH"],
        stock_selection: {
            gte: 0,
            lte: 20.00,
            float: 20000000,
            perc_change: 20
        }
    },
    crypto: {
        preferred: ["BTC", "ETH", "DOGE", "LTC", "ADA"]
    },
    fxpairs: {
        preferred: ["EUR/USD", "GPB/USD", "USD/JPY", "USD/CHF", "USD/CAD"]
    }
}
export const defaultSettings = {}