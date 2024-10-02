<script setup lang="ts">
const emit = defineEmits<(e: 'choose-market-type', tab: string) => void>()
const props = defineProps<{
    tab: string
}>()

function changeTabs(tab: string
) {
    emit("choose-market-type", tab)

}
</script>
<template>
    <div ref="el" class="w-full flex  bg-black rounded-2xl gap-x-6">
        <button :class="{ '!text-lime-500 !opacity-100': tab === 'forex' }"
            class="opacity-70 transition duration-300 hover::opacity-100" @click="changeTabs('forex')">
            <Icon name="solar:banknote-2-linear" size="24" />
        </button>
        <button :class="{ ' !text-lime-500 !opacity-100': tab === 'stocks' }"
            class="opacity-70 transition duration-300 hover::opacity-100" @click="changeTabs('stocks')">
            <Icon name="solar:buildings-2-linear" size="24" />

        </button>
        <button :class="{ ' !text-lime-500 !opacity-100': tab === 'crypto' }"
            class="opacity-70 transition duration-300 hover::opacity-100" @click="changeTabs('crypto')">
            <Icon name="cryptocurrency:eth" size="24" />

        </button>


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