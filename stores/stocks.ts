import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ServerResponse, StatusCode } from '~/server/types'
import type { MarketStatus } from '~/server/types/fx.types'
import type { Stock } from '~/types/index.types'
export const useStockstore = defineStore('Stocks', () => {
    const Stocks = ref<Stock[]>()
    const MarketStatus = ref<MarketStatus>()
    async function fetchStocksData() {

        try {

            const resp = await $fetch<ServerResponse<StatusCode, Stock[]>>("/api/stocks/fetch", {
                method: "GET",
                onResponseError({ response }) {
                    throw new Error(genErrorMessage(response._data.message, 500))
                }
            })
            if (resp.ok && resp.data) {

                Stocks.value = resp.data
            }
            const resp2 = await $fetch<ServerResponse<StatusCode, MarketStatus>>("/api/market/status", {
                method: "GET",
                onResponseError({ response }) {
                    // $toast.error(response._data)
                    throw new Error(genErrorMessage(response._data.message, 500))
                }
            })
            if (resp2.ok && resp2.data) {
                console.log(resp2.data)
                MarketStatus.value = resp2.data
            }

        } catch (error) {
            // throw new Error(`${error}`)
        }

    }

    return { Stocks, fetchStocksData, MarketStatus }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStockstore, import.meta.hot))
}
