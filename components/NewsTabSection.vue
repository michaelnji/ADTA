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
    <div ref="el" class=" grid grid-cols-3 bg-black p-3 rounded-2xl gap-x-3 relative">
        <button :class="{ ' !text-stone-900': tab === 'market' }" class="flex z-1  items-center justify-center "
            @click="changeTabs('market')">
            <h2 class=" font-medium text-sm">Market</h2>
        </button>
        <button :class="{ ' !text-stone-900': tab === 'watchlist' }" class="flex z-1  items-center justify-center "
            @click="changeTabs('watchlist')">
            <h2 class=" font-medium text-sm">Watchlist</h2>
        </button>
        <button :class="{ ' !text-stone-900': tab === 'analysis' }" class="flex z-1  items-center justify-center "
            @click="changeTabs('analysis')">
            <h2 class=" font-medium text-sm line-clamp-1"> Analysis</h2>
        </button>

        <div class="absolute w-1/3  top-2 bottom-2  !bg-lime  p-3 rounded-xl transition duration-300 ease-out" :class="{
    'translate-x-2': tab === 'market',
    'c': tab === 'watchlist',
    'd': tab === 'analysis',
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