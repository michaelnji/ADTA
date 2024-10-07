<script setup lang="ts">
import { useStockstore } from '~/stores/stocks';
import type { Stock } from '~/types/index.types';

definePageMeta({
    title: 'ADTA - Home',
    description: "ADTA - Home"
})
const stockStore = useStockstore()
</script>

<template>
    <div>
        <ForexBanner />
        <div class=" w-full overflow-x-hidden mt4 grid xl:grid-cols-2 gap-12 p6 md:p12 lg:px-6 xl:px12  ">
            <BiggestInstrument :stock="stockStore.Stocks[0]" />
            <div class="flex flex-col transition-all duration-300 gap-y-12">
                <Quote />
                <TopMovers />
                <News />
            </div>
        </div>

    </div>
</template>
