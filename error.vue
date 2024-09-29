<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
    error: Object as () => NuxtError
})
function reloadPage() {
    reloadNuxtApp()
}
const router = useRouter()
</script>

<template>
    <NuxtLayout name="default">


    </NuxtLayout>
</template>
