    <script lang="ts" setup>
    import { randomInt } from 'mathjs';

    let indexes: { instrument: string, change: number, price: number }[] = []
    const isLoading = ref(true)
    const runtimeConfig = useRuntimeConfig()
    const stockStore = useStockstore()
    async function fetchData() {
        isLoading.value = true
            for (let i = 0; i < stockStore.Stocks.length; i++) {
                if (i > 3 && i < 13) {
                    const element = stockStore.Stocks[i]
                    const url = `${runtimeConfig.public.finnhubUrl}/api/v1/quote?symbol=${element.displaySymbol}&token=${runtimeConfig.public.finnhubKey}`
                    const quote = await $fetch<{ "c": number, "d": number, "dp": number, "h": number, "l": number, "o": number, "pc": number, "t": number }>(url, {
                        onResponseError({ response }) {
                            $toast.error(genErrorMessage(500, response._data))
                            return
                        },
                        retry: 3,
                        retryDelay: 1000
                    })
                    if (quote) {

                        const data = {
                            instrument: element.displaySymbol,
                            change: Number.parseFloat(element.perc_chnge ?? '0'),
                            price: quote.c
                        }
                        indexes.push(data)
                    }
                }
            }
        isLoading.value = false
    }
    onMounted(async () => {
        indexes = []
        await fetchData()
    })
    watch(() => stockStore.Stocks, async () => {
        indexes = []
        await fetchData()
    })

</script>
<template>
    <div>
        <div class="flex max-w-screen overflow-x-auto p3 gap-x-8 bg-black items-center ">
            <Skeleton class=" rounded-2xl  bg-stone-900 p3.5 !min-w-10rem gap-x-3" v-if="isLoading"
                v-for="index in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]">
            </Skeleton>
            <div class="flex  w-max items-center rounded-2xl bg-black  gap-x-3" v-if="!isLoading"
                v-for="index in indexes">
                <h3 class="   font-display text-base sm:text-lg font-bold">{{ index.instrument }}
                </h3>
                <div class="flex items-center gap-x-2">
                    <p class="font-semibold flex items-center gap-x-1  w-max text-yellow-500 text-base ">
                        $
                        <AnimatedNumbers :amount="index.price" :isDecimal="true" />
                    </p>
                    <div class=" ml-2 text-sm px2 py1 font-semibold rounded"
                        :class="{ 'text-lime-500 bg-lime-500 bg-opacity-10': index.change > 0, 'text-pink-500 bg-pink-500 bg-opacity-10': index.change < 0 }">
                        {{
                        `${index.change >= 0 ? '+' : ''}${index.change.toFixed(2)}` }}%</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>