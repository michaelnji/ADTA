<script lang="ts" setup>
import type { ServerResponse, StatusCode } from '~/server/types';
import type { Quote12 } from '~/types/index.types';
const stockStore = useStockstore()
const stocks = ref(stockStore.Stocks)
let top: { data: Quote12, rv: number, float: number, points: number }[] = []
const isLoading = ref(true)
async function fetchData() {
    isLoading.value = true
    top = []
    for (const stock of stocks.value) {
        if (stock.position && stock.position > 1 && stock.position <= 4) {
            const resp = await $fetch<ServerResponse<StatusCode, Quote12>>("/api/stocks/quote", {
                method: "POST",
                body: {
                    displaySymbol: stock.displaySymbol,
                }, onResponseError({ response }) {

                    $toast.error(genErrorMessage(response._data.message, 500))
                }, retry: 3,
                retryDelay: 5000
            })
            if (resp.ok && resp.data) {
                const el = {
                    data: resp.data,
                    rv: Number.parseFloat(stock.rv ?? '0'),
                    float: Number.parseFloat(stock.float ?? '0'),
                    points: stock.points ?? 0
                }

                top = [...top, el]
            }
        }

    }
    if (top.length >= 1) {

        isLoading.value = false
    }
}
onMounted(async () => {
    top = []
    await fetchData()
})
whenever(() => stockStore.Stocks, async () => {
    top = []
    await fetchData()

})

</script>
<template>
    <div class=" hmax">
        <h3 class="text-lg  !font-normal  opacity-80">Runner-ups</h3>
        <div class="grid sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3  mt4 gap-4 md:gap-8">
            <Skeleton v-if="isLoading" v-for="i in [1, 2, 3]" class="px6 py20 rounded-2xl bg-stone-900">

            </Skeleton>
            <div v-if="!isLoading" v-for="stock in top"
                class="    text-white py3 p3  border sm:border-none border-stone-900  rounded-2xl sm:bg-stone-900 !bg-opacity-60">
                <div class="flex justify-between">
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
                            <h3 class="font-bold flex  items-start gap-x-2 font-display text-lg sm:text-xl">{{
                                stock.data.symbol }}
                            </h3>
                            <div class="flex lg:mt1 text-sm items-center gap-x-2">
                                <p class=" text-base   opacity-80">{{ stock.data.exchange }}</p>

                            </div>
                        </div>

                    </div>
                    <div class="">
                        <p class="text-lg flex  gap-x-1 font-bold ">
                            <span> $</span>
                            <AnimatedNumbers :format="true" :amount="Number.parseFloat(stock.data.close)" />
                        </p>
                        <div class="flex gap-x-2 mt1 items-center">
                            <p :class="{
                                ' !text-pink ': Number.parseFloat(stock.data.percent_change ?? '') < 0,
                                ' !text-lime ': Number.parseFloat(stock.data.percent_change ?? '') >= 0,

                            }" class=" text-xs sm:text-sm "><b class="font-medium   "><span
                                        v-if="Number.parseFloat(stock.data.percent_change ?? '') >= 0">+</span>{{
                                            Number.parseFloat(stock.data.percent_change ?? '').toFixed(0)
                                        }}%</b> <span class="opacity-70"></span>
                            </p>

                        </div>
                    </div>
                </div>
                <div class="border-b border-stone-900 sm:border-stone-800 my4 "></div>
                <div class="flex justify-between">
                    <div>
                        <p class="op80 text-xs sm:text-sm">
                            RV
                        </p>
                        <p class="text-xs sm:text-sm">
                            {{ stock.rv.toFixed(3) }}
                        </p>

                    </div>
                    <div>
                        <p class="op80 text-xs sm:text-sm">
                            Float
                        </p>
                        <p class="text-xs sm:text-sm">
                            {{ stock.float.toFixed(3) }}
                        </p>

                    </div>
                    <div>
                        <p class="op80 text-xs sm:text-sm">
                            Points
                        </p>
                        <p class="text-xs sm:text-sm">
                            {{ stock.points }}
                        </p>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style></style>