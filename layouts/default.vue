<script setup>
import { formatDistance } from 'date-fns';
import { useFxPairStore } from '~/stores/fxpairs';
import { useStockstore } from '~/stores/stocks';

const route = useRoute()
const title = computed(() => route.meta.title ?? 'DJS')
const fxStore = useFxPairStore()
const stockStore = useStockstore()
await stockStore.fetchStocksData()
</script>

<template>
    <div>
        <Html>

        <Head>
            <Title>{{ title }}</Title>
        </Head>

        <Body class="bg-black text-white relative">
            <div class="p6 flex items-center border-b border-stone-900 justify-between">
                <div class="flex items-center gap-x-1">
                    <Icon name="mingcute:sparkles-2-fill" size="24" class='text-lime' />
                    <h1 class="font-bold text-lg font-display"><span class="">Gem</span>Trader</h1>
                </div>
                <div class="p2 px3 rounded-full wmax !hidden sm:!flex  bg-pink font-medium text-pink text-xs  bg-op-10 flex justify-center items-center gap-x-2 text-center"
                    v-if="!stockStore.MarketStatus.isTheStockMarketOpen">
                    <Icon name="solar:info-circle-linear" size="18" />
                    <span> Market is closed</span>

                </div>
                <div class="p2 px3 rounded-full wmax !hidden sm:!flex  bg-lime font-medium text-lime text-xs  bg-op-10 flex justify-center items-center gap-x-2 text-center"
                    v-if="stockStore.MarketStatus.isTheStockMarketOpen">
                    <div class="size-2 rounded-full animate-pulse bg-lime"></div>
                    <span> Market is open</span>

                </div>
                <NuxtLink to="/settings" class="opacity-50 hover:opacity-100 hover:text-lime" :class="{
                    '!text-lime !opacity-100': route.fullPath === '/settings'
                }">
                    <Icon size="24" name="solar:settings-minimalistic-linear" />
                </NuxtLink>
            </div>
            <div class="p2 px3 wfull sm:!hidden  bg-pink font-medium text-pink text-xs  bg-op-10 flex justify-center items-center gap-x-2 text-center"
                v-if="!stockStore.MarketStatus.isTheStockMarketOpen">
                <Icon name="solar:info-circle-linear" size="18" />
                <span> Market is closed</span>

            </div>
            <Navbar />
            <div class="pb20 overflow-hidden">
                <slot />
            </div>
        </Body>

        </Html>
    </div>

</template>
