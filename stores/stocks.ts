import { isYesterday } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ServerResponse, StatusCode } from '~/server/types'
import type { Country, FxPair } from '~/server/types/fx.types'
import { getItemValue, getOrSetItem, setItemValue } from '~/utils/dbManager'
import { strategies } from '../data/settings'
import type { Stock } from '~/types/index.types'
export const useStockstore = defineStore('Stocks', () => {
    const Stocks = ref<Stock[]>()
    async function fetchStocks() {

        try {

            const resp = await $fetch<ServerResponse<StatusCode, Stock[]>>("/api/stocks/fetch", {
                method: "GET",
                onResponseError({ response }) {
                    throw new Error(genErrorMessage(response._data.message, 500))
                }
            })
            if (resp.ok && resp.data) {
                console.log(resp.data)
                Stocks.value = resp.data
            }
        } catch (error) {

        }

    }

    return { Stocks, fetchStocks }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStockstore, import.meta.hot))
}
