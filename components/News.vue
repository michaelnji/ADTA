<script lang="ts" setup>
import type { ServerResponse, StatusCode } from '~/server/types';
import type { NewsArticles } from '~/server/types/news.types';
const isLoading = ref(true)
const newsArray = ref<NewsArticles[]>()
const chosenTab = ref('forex')
onMounted(async () => {
    try {
        const resp = await $fetch<ServerResponse<StatusCode, NewsArticles[]>>("/api/ext/news/fetch", {
            method: "POST",
            body: {
                category: chosenTab.value,
                limit: 4
            }, onResponseError({ response }) {
                $toast.error(genErrorMessage(response._data.message, 500))
            }
        })
        if (resp.ok && resp.data) {
            isLoading.value = false
            newsArray.value = resp.data
            console.log(newsArray)
        }
    } catch (error) {

    }
})
watch(chosenTab, async () => {
    try {
        isLoading.value = true
        const resp = await $fetch<ServerResponse<StatusCode, NewsArticles[]>>("/api/ext/news/fetch", {
            method: "POST",
            body: {
                category: chosenTab.value,
                limit: 4
            },
            onResponseError({ response }) {
                $toast.error(genErrorMessage(response._data.message, 500))
            }
        })
        if (resp.ok && resp.data) {
            isLoading.value = false
            newsArray.value = resp.data
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
                <div class="max-w-xs wfull ">
                    <NewsTabSection :tab="chosenTab" @tab-change="(e) => chosenTab = e" />
                </div>

                <div class="mt6 grid gap-y-3">
                    <div v-for="news, i in newsArray" v-if="!isLoading">
                        <NuxtLink target="_blank" v-if="i <= 3" :to="news.url">
                            <div class="rounded-xl transition duration-300 hover:bg-stone-900 p3 flex gap-x-4">
                                <img :src="news.image_url" :alt="news.source" class="sm:size-28 size-20 rounded-md">
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
                    <div v-for="i in [0, 1, 2]" v-if="isLoading" class="">
                        <div class="rounded-xl transition duration-300  p3 flex gap-x-4">
                            <Skeleton class="w-28 h20 rounded-xl bg-stone-900" />
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