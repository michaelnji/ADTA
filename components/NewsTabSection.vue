<script setup lang="ts">
const emit = defineEmits<(e: 'tab-change', tab: string) => void>()
const props = defineProps<{
    tab: string
}>()

function changeTabs(tab: string
) {
    emit("tab-change", tab)

}
</script>
<template>
    <div ref="el" class="w-full grid grid-cols-3 bg-stone-100 dark:bg-stone-950 p-3 rounded-2xl gap-x-3 relative">
        <button class="flex z-1  cursor-pointer items-center justify-center " @click="changeTabs('politics')">
            <h2 class=" font-normal">Politics</h2>
        </button>
        <button class="flex z-1  cursor-pointer items-center justify-center " @click="changeTabs('crypto')">
            <h2 class=" font-normal"> Crypto</h2>
        </button>
        <button class="flex z-1  cursor-pointer items-center justify-center " @click="changeTabs('forex')">
            <h2 class=" font-normal">Forex</h2>
        </button>
        <div class="absolute w-1/3  top-2 bottom-2 bg-white dark:bg-stone-900 p-3 rounded-xl transition duration-300 ease-out"
            :class="{
                'translate-x-2': tab === 'politics',
                'c': tab === 'crypto',
                'd': tab === 'forex',
            }">
        </div>
    </div>
</template>

<style>
.d {
    transform: translateX(calc(200% - 0.5rem));
}

.c {
    transform: translateX(100%);
}
</style>