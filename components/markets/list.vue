<script lang="ts" setup>
import { randomInt } from 'mathjs';

const currentItem = ref('forex')
</script>
<template>
    <div class="wfull hmax">
        <div class="flex justify-between items-center">
            <h3 class="text-lg md:text-xl !font-normal  opacity-80">Markets</h3>
            <div class="wmax">
                <MarketsMarketType :tab="currentItem" @choose-market-type="(e) => currentItem = e" />
            </div>
        </div>
        <div class=" min-h-45rem flex flex-col  mt4 gap-3 md:border border-stone-900 md:px-4 py6 rounded-2xl">
            <MarketsInstrument :change="randomInt(-50, 100)" :price="randomInt(100, 500)" :symbol="'USD/JPY'" />
            <MarketsInstrument :change="randomInt(-50, 100)" :price="randomInt(100, 500)" :symbol="'USD/CAD'" />
            <MarketsInstrument :change="randomInt(-50, 100)" :price="randomInt(100, 500)" :symbol="'USD/GBP'" />
            <MarketsInstrument :change="randomInt(-50, 100)" :price="randomInt(100, 500)" :symbol="'USD/ZAR'" />

        </div>
    </div>
</template>

<style></style>