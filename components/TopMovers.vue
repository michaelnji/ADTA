<script lang="ts" setup>
import { randomInt } from 'mathjs';
import type { ServerResponse, StatusCode } from '~/server/types';
import type { Quote12, Stock } from '~/types/index.types';
const stockStore = useStockstore()
const top = ref<Quote12[]>([])
const isLoading = ref(true)
onMounted(async () => {
    if (stockStore.Stocks) {
        for (const stock of stockStore.Stocks) {
            if (stock.position && stock.position > 1 && stock.position <= 4) {
                const resp = await $fetch<ServerResponse<StatusCode, Quote12>>("/api/stocks/quote", {
                    method: "POST",
                    body: {
                        displaySymbol: stock.displaySymbol,
                    }, onResponseError({ response }) {

                        $toast.error(genErrorMessage(response._data.message, 500))
                    }
                })
                if (resp.ok && resp.data) {
                    top.value.push(resp.data)
                }
            }
        }
        isLoading.value = false
    }
})

</script>
<template>
    <div class="wfull hmax">
        <h3 class="text-lg  !font-normal  opacity-80">Runner-ups</h3>
        <div class="grid sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3  mt4 gap-4 md:gap-8">
            <Skeleton v-if="isLoading" v-for="i in [1, 2, 3]" class="px6 py10 rounded-2xl bg-stone-900">

            </Skeleton>
            <div v-if="!isLoading" v-for="stock in top"
                class="flex  justify-between  text-white py3 sm:p3 sm:rounded-2xl sm:bg-stone-900 !bg-opacity-60">
                <div class="flex items-center gap-x-4">
                    <!-- <div class="flex">

                        <div class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white">
                            <Icon name="flag:us-1x1" class="" size="40" />
                        </div>
                        <div
                            class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white ">
                            <Icon name="flag:ch-1x1" class="" size="40" />
                        </div>
                    </div> -->
                    <div>
                        <h3 class="font-bold flex  items-start gap-x-2 font-display text-xl">{{ stock.symbol }}
                        </h3>
                        <div class="flex lg:mt1  items-center gap-x-2">
                            <p class=" text-base   opacity-80">{{ stock.exchange }}</p>

                        </div>
                    </div>

                </div>
                <div class="">
                    <p class="text-lg flex  gap-x-1 font-bold ">
                        <span> $</span>
                        <AnimatedNumbers :format="true" :amount="Number.parseFloat(stock.open)" />
                    </p>
                    <div class="flex gap-x-2 mt1 items-center">
                        <p :class="{
                            ' !text-pink ': Number.parseFloat(stock.percent_change ?? '') < 0,
                            ' !text-lime ': Number.parseFloat(stock.percent_change ?? '') >= 0,

                        }" class=" text-sm "><b class="font-medium   "><span
                                    v-if="Number.parseFloat(stock.percent_change ?? '') >= 0">+</span>{{
                                        Number.parseFloat(stock.percent_change ?? '').toFixed(3)
                                }}%</b> <span class="opacity-70"></span>
                        </p>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style></style>