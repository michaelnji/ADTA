import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ServerResponse, StatusCode } from '~/server/types'
import type { MarketStatus } from '~/server/types/fx.types'
import type { Stock } from '~/types/index.types'
export const useStockstore = defineStore('Stocks', () => {
    const Stocks = ref<Stock[]>([])
    const MarketStatus = ref<MarketStatus>()
    async function fetchStocksData() {
        const resp = await $fetch<ServerResponse<StatusCode, Stock[]>>("/api/stocks/fetch", {
                method: "GET",
                onResponseError({ response }) {
                    throw new Error(genErrorMessage(response._data.message, 500))
            }, retry: 3,
            retryDelay: 1000
            })
        if (resp.ok && resp.data && resp.data.length > 0) {

                Stocks.value = resp.data
            }
        else if (resp.ok && resp.data && resp.data.length <= 0) {

            throw new Error(genErrorMessage('Scanner is at work', 500))
        }
        else {
            throw new Error(genErrorMessage(resp.message, 500))
        }
            const resp2 = await $fetch<ServerResponse<StatusCode, MarketStatus>>("/api/market/status", {
                method: "GET",
                onResponseError({ response }) {
                    // $toast.error(response._data)
                    throw new Error(genErrorMessage(response._data.message, 500))
                }, retry: 3,
                retryDelay: 5000
            })
            if (resp2.ok && resp2.data) {

                MarketStatus.value = resp2.data
                return
            }

        throw new Error(genErrorMessage(resp2.message, 500))

    }

    function $reset() {
        Stocks.value = []
        MarketStatus.value = undefined
    }
    return { Stocks, fetchStocksData, MarketStatus, $reset }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStockstore, import.meta.hot))
}
