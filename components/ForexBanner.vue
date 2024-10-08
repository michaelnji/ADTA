    <script lang="ts" setup>
    const indexes = [
        {
            instrument: 'BTC',
            price: 65670.901,
            change: 0.3
        },
        {
            instrument: 'USD/JPY',
            price: 145.14,
            change: -0.09
        },
        {
            instrument: 'USDOIL',
            price: 110.394,
            change: 0.67
        },
        {
            instrument: 'AAPL',
            price: 1240.94,
            change: 0
        },


        {
            instrument: 'GOOGL',
            price: 40.394,
            change: 0.7
        },
        {
            instrument: 'NVID',
            price: 3240.00,
            change: 300
        },
    ]
</script>
<template>
    <div>
        <div class="flex max-w-screen overflow-x-auto p3 gap-x-4 bg-stone-900 items-center">
            <div class="flex  w-max items-center rounded-2xl  bg-black p3 px-6 gap-x-3" v-for="index in indexes">
                <h3 class="   font-display text-base sm:text-lg font-bold">{{ index.instrument }}
                </h3>
                <div class="flex items-center gap-x-2">
                    <p class="font-semibold  w-max text-yellow-500 text-base ">
                        <AnimatedNumbers :amount="index.price" :isDecimal="true" />
                    </p>
                    <div class=" ml-2 text-sm"
                        :class="{ 'text-lime-500': index.change > 0, 'text-pink-500': index.change < 0 }">{{
                        `${index.change >= 0 ? '+' : ''}${index.change}` }}%</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>