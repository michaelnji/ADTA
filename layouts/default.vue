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

        <Body class="bg-stone-50 dark:bg-stone-950 w-screen">
            <slot />
        </Body>

        </Html>
    </div>
</template>
