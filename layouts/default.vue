<script setup>
const route = useRoute()

const title = computed(() => route.meta.title ?? 'DJS')

</script>

<template>
    <div>
        <Html>

        <Head>
            <Title>{{ title }}</Title>
        </Head>

        <Body class="bg-stone-950 text-white ">
            <slot />
        </Body>

        </Html>
    </div>
</template>
