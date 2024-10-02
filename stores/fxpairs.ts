import { isYesterday } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ServerResponse, StatusCode } from '~/server/types'
import type { Country, FxPair } from '~/server/types/fx.types'
import type { NewsArticles } from '~/server/types/news.types'
import { getItemValue, getOrSetItem, setItemValue } from '~/utils/dbManager'
import { strategies } from '../data/settings'
export const useFxPairStore = defineStore('FX_PAIRS', () => {
    const fxPairs = ref<FxPair[]>()
    const countries = ref<Country[]>()
    async function fetchFxPairs() {
        const strategiesData = getOrSetItem("STRATEGIES", strategies)
        const localData = getItemValue('FX_PAIRS') as { updated_at: string, pairs: FxPair[] }
        const now = new Date()
        if (localData && !isYesterday(new Date(localData.updated_at))) {
            fxPairs.value = localData.pairs
            return
        }
        try {

            const resp = await $fetch<ServerResponse<StatusCode, FxPair[]>>("/api/fx/pairs", {
                method: "GET",
                onResponseError({ response }) {
                    throw new Error(genErrorMessage(response._data.message, 500))
                }
            })
            if (resp.ok && resp.data) {
                let data = resp.data
                data = data.filter((x) => x.currency_group === 'Major' || x.currency_group === 'Minor' && strategiesData.fxpairs.preferred.find((y: string) => y === x.symbol))
                fxPairs.value = setItemValue("FX_PAIRS", {
                    updated_at: now,
                    pairs: data
                }).pairs
            }
        } catch (error) {

        }

    }
    return { fxPairs, fetchFxPairs }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFxPairStore, import.meta.hot))
}
