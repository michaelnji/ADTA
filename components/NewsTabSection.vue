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
    <div ref="el" class="w-full grid grid-cols-3 bg-black p-3 rounded-2xl gap-x-3 relative">
        <button :class="{ ' !text-stone-900': tab === 'forex' }" class="flex z-1  items-center justify-center "
            @click="changeTabs('forex')">
            <h2 class=" font-medium">Forex</h2>
        </button>
        <button :class="{ ' !text-stone-900': tab === 'politics' }" class="flex z-1  items-center justify-center "
            @click="changeTabs('politics')">
            <h2 class=" font-medium">Politics</h2>
        </button>
        <button :class="{ ' !text-stone-900': tab === 'crypto' }" class="flex z-1  items-center justify-center "
            @click="changeTabs('crypto')">
            <h2 class=" font-medium"> Crypto</h2>
        </button>

        <div class="absolute w-1/3  top-2 bottom-2  !bg-lime  p-3 rounded-xl transition duration-300 ease-out" :class="{
    'translate-x-2': tab === 'forex',
    'c': tab === 'politics',
    'd': tab === 'crypto',
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