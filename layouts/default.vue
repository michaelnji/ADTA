<script setup>
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
            <Navbar />
            <div class="pb20">
                <slot />
            </div>
        </Body>

        </Html>
    </div>
</template>
