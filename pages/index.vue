<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue';
definePageMeta({
    title: 'DJ Services',
    description: "DJ services"
})
const router = useRouter()
// onMounted(() => {
//     router.push("/connexion")
// })
</script>

<template>
    <Transition name="fadex">
        <div class=" h-screen w-screen fixed z-999 bg-white dark:bg-stone-950 grid place-items-center">
            <Icon name="svg-spinners:180-ring-with-bg" size="35" />
        </div>
    </Transition>
</template>
