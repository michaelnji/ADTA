<script setup lang="ts">
import type { NuxtError } from '#app';
import { isFuture, addMinutes, format, formatDistance, formatDistanceToNow } from 'date-fns';

const props = defineProps({
    error: Object as () => NuxtError
})
function reloadPage() {
    reloadNuxtApp()
}
const router = useRouter()
const timestamp = useTimestamp()
const base = addMinutes(new Date(), 7)
const timer = computed(() => formatDistance(base, new Date(timestamp.value), {
    "includeSeconds": false,

}))
const stop = computed(() => {
    if (timestamp.value) return isFuture(base)
})

</script>
<template>
    <div class="bg-black text-white p6 size-screen grid place-items-center">

        <div v-if="error && error.message.includes('offline')" class="flex flex-col items-center">
            <Icon name="svg-spinners:bars-rotate-fade" class="text-lime" size="60" />
            <h2 class="text-lime mt3 text-center font-bold font-display text-4xl sm:text-6xl">
                No internet connection

            </h2>
            <p class="text-center mt3 text-sm sm:text-base opacity-70 max-w-xl mxa">GemTrader can't connect to the
                server, please
                make
                sure
                your internet is
                working and reload.</p>
            <Button @click="reloadPage"
                class="py2 px6 rounded-full bg-lime text-black font-medium text-base hover:bg-lime-600  mt8">
                Reload
            </Button>
        </div>
        <div v-if="error && error.message.includes('displaySymbol') || error?.message.includes('Scanner is at work')"
            class="flex flex-col items-center">
            <Icon name="svg-spinners:bars-scale-middle" class="text-lime" size="60" />
            <h2 class="text-lime mt3 text-center font-bold font-display text-4xl sm:text-6xl">
                Scanning for stocks

            </h2>
            <p class="text-center mt3 text-sm sm:text-base opacity-70 max-w-xl mxa">GemTrader's scanners are
                currently working hard to find the best stocks to trade.</p>
            <span v-if="stop" class="text-xs mt8 opacity-70">Retry in: <b> {{ timer }}</b> </span>
            <Button @click="reloadPage"
                class="py2 px6 rounded-full bg-lime text-black font-medium text-base hover:bg-lime-600  mt2"
                :disabled="stop">
                Reload GemTrader
            </Button>
        </div>
    </div>

</template>