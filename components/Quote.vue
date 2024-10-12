<script lang="ts" setup>
import type { ServerResponse, StatusCode } from '~/server/types';
import type { NewsArticles } from '~/server/types/news.types';

const STApi = 'https://strangerthings-quotes.vercel.app/api/quotes'
const isLoading = ref(true)
const quoteDetail = ref<{
    quote: string,
    author: string
}>()
onMounted(async () => {
    try {
        const resp = await $fetch<{
            quote: string,
            author: string
        }[]>(STApi, {
            onResponseError({ response }) {
                $toast.error(genErrorMessage(response._data, 500))
            },
            retry: 3,
            retryDelay: 1000
        })
        if (resp) {
            isLoading.value = false
            quoteDetail.value = resp[0]
        }
    } catch (error) {

    }
})
</script>
<template>
    <div>
        <div class="bg-lime text-pretty wfull transition-all duration-300 p6 text-black rounded-2xl hmax">
            <div v-if="!isLoading && quoteDetail">
                <div class="mb3">
                    <Icon name="solar:crown-minimalistic-linear" size="50" />
                </div>
                <p class="font-display text-3xl font-medium">
                    {{ quoteDetail.quote }}

                </p>
                <div class="mt-6 mla text-xl  font-bold flex justify-end">- {{ quoteDetail.author }}</div>
            </div>
            <div v-if="isLoading">
                <div class="mb3">
                    <Skeleton class=" bg-lime-500 rounded-2xl size-20" />
                </div>
                <Skeleton class=" bg-lime-500 rounded-2xl size-30 w-full" />
                <div class="mt-6 mla text-2xl font-bold flex justify-end">
                    <Skeleton class=" bg-lime-500 rounded-2xl size-12 w-36" />

                </div>
            </div>
        </div>
    </div>

</template>


<style></style>