<script setup lang="ts">
import { useStockstore } from '~/stores/stocks';

definePageMeta({
    title: 'ADTA - Home',
    description: "ADTA - Home"
})
const stockStore = useStockstore()
</script>

<template>
    <div>
        <ForexBanner />
        <div class="  overflow-x-hidden mt4 grid xl:grid-cols-2 gap-y-12 sm:gap-12  p6 md:p12  lg:px-6 xl:px12   ">
            <div class="flex flex-col gap-y-12 w-full">
                <BiggestInstrument :stock="stockStore.Stocks[0]" v-if="stockStore.Stocks" />
                <Holidays class="hidden xl:block" />
            </div>
            <div class="flex flex-col transition-all duration-300 gap-y-12 ">
                <TopMovers />
                <Holidays class="xl:hidden" />
                <News />
            </div>
        </div>

    </div>
</template>
