<script setup>
import { useFxPairStore } from '~/stores/fxpairs';

const route = useRoute()
const title = computed(() => route.meta.title ?? 'DJS')
const fxStore = useFxPairStore()
onMounted(async () => {
    await fxStore.fetchFxPairs()
    console.log(fxStore.fxPairs)
})
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
