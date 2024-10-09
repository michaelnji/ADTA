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
            <div class="p3  bg-opacity-20 flex justify-center items-center gap-x-2 text-center"
                v-if="!stockStore.MarketStatus.isTheStockMarketOpen">
                <Icon name="solar:info-circle-linear" size="20" />
                <span> The Market is now closed.</span>

            </div>
            <Navbar />
            <div class="pb20">
                <slot />
            </div>
        </Body>

        </Html>
    </div>
</template>
