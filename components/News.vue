<script lang="ts" setup>
import type { Story, TickerNews } from '~/server/types/news.types';
import { wait } from '~/utils/misc';
const stockStore = useStockstore()
const isLoading = ref(true)
const runtimeConfig = useRuntimeConfig()
const newsArray = ref<Story[]>([])
const chosenTab = ref('market')
onMounted(async () => {
    try {
        isLoading.value = true
        if (chosenTab.value !== 'watchlist') {
            const newsUrl = `${runtimeConfig.public.tickerUrl}?q=T:${chosenTab.value}`
            const news = await $fetch<TickerNews>(newsUrl, {
                onResponseError({ response }) {
                    $toast.error(genErrorMessage(500, response._data))
                    return
                }
            })
            if (news.stories) {
                newsArray.value = news.stories
                isLoading.value = false
            }
        }
        else {
            if (stockStore.Stocks) {
                for (let i = 0; i < stockStore.Stocks.length; i++) {
                    if (i % 7 === 0) {
                        await wait(50000)
                    }
                    const element = stockStore.Stocks[i]
                    const newsUrl = `${runtimeConfig.public.tickerUrl}?q=z:${element.displaySymbol}&n=1&(or T:earning T:sec T:sec_fin)`
                    const news = await $fetch<TickerNews>(newsUrl, {
                        onResponseError({ response }) {
                            $toast.error(genErrorMessage(500, response._data))

                        }
                    })
                    if (news.stories) {
                        newsArray.value = [...newsArray.value, ...news.stories]
                    }
                }
                isLoading.value = false
            }
        }

    } catch (error) {

    }
})
watch(chosenTab, async () => {
    try {
        isLoading.value = true
        if (chosenTab.value !== 'watchlist') {
            const newsUrl = `${runtimeConfig.public.tickerUrl}?q=T:${chosenTab.value}`
            const news = await $fetch<TickerNews>(newsUrl, {
                onResponseError({ response }) {
                    $toast.error(genErrorMessage(500, response._data))
                    return
                }
            })
            if (news.stories) {
                newsArray.value = news.stories
                isLoading.value = false
            }
        }
        else {
            if (stockStore.Stocks) {
                for (let i = 0; i < stockStore.Stocks.length; i++) {
                    if (i % 7 === 0) {
                        await wait(50000)
                    }
                    const element = stockStore.Stocks[i]
                    const newsUrl = `${runtimeConfig.public.tickerUrl}?q=z:${element.displaySymbol}&n=2&(or T:earning T:sec T:sec_fin)`
                    const news = await $fetch<TickerNews>(newsUrl, {
                        onResponseError({ response }) {
                            $toast.error(genErrorMessage(500, response._data))

                        }
                    })
                    if (news.stories) {


                        newsArray.value = [...newsArray.value, ...news.stories]
                    }
                }
                isLoading.value = false
            }
        }

    } catch (error) {

    }
})
</script>
<template>
    <div class='transition-all duration-300'>
        <div class="wfull">
            <h3 class="text-lg  !font-normal  opacity-80">Today's News
            </h3>
            <div class="wfull rounded-3xl  md:px6 md:py8 md:bg-stone-900 !bg-opacity-60 mt4">
                <div class="max-w-sm   ">
                    <NewsTabSection :tab="chosenTab" @tab-change="(e) => chosenTab = e" />
                </div>

                <div class="mt6 grid gap-y-3 py12 xl:h-45rem xl:overflow-y-auto">
                    <div v-for="news, i in newsArray" v-if="!isLoading">
                        <NuxtLink target="_blank" :to="news.url">
                            <div class="rounded-xl transition duration-300 hover:bg-stone-900 p3 flex gap-x-4">

                                <div class="w-full">
                                    <h3 class="sm:text-lg line-clamp-1 text-pretty !font-medium">{{ news.title }}
                                    </h3>
                                    <p class="sm:text-base text-sm mt2 text-pretty font-light line-clamp-2 opacity-90 ">
                                        {{
                                            news.description }}
                                    </p>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                    <div v-for="i in [0, 1, 2, 3]" v-if="isLoading" class="">
                        <div class="rounded-xl transition duration-300  p3 flex gap-x-4">
                            <!-- <Skeleton class="w-28 h20 rounded-xl bg-stone-900" /> -->
                            <div class="w-full">
                                <Skeleton class="h-8 w-60% rounded-lg bg-stone-900" />
                                <Skeleton class="h4 mt4 w-90% rounded-lg bg-stone-900" />
                                <Skeleton class="h4 mt2 w-90% rounded-lg bg-stone-900" />
                                <Skeleton class="h4 mt2 w-90% rounded-lg bg-stone-900" />
                            </div>
                        </div>
                    </div>
                    <div class="mt6 grid gap-y-3 h20rem flex items-center justify-center gap-3"
                        v-if="newsArray && newsArray?.length <= 0 && !isLoading">
                        <h1 class="font-display text-2xl opacity-30">No news for now</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>