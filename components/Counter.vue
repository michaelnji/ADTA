<script setup lang="ts">
import '~/web/counter';

const props = defineProps<{
    format?: boolean,
    amount: number
}>()
const numToArray = computed(() => {
    const formattedNum = Intl.NumberFormat('cm', { minimumSignificantDigits: 3 }).format(props.amount).toString()
    return formattedNum.split(',')
})


</script>
<template>
    <div v-if="!format">
        <ClientOnly>
            <layflags-rolling-number style="--roll-duration:750ms" :value="amount">000</layflags-rolling-number>
        </ClientOnly>
    </div>
    <div class="flex" v-if="format">
        <div v-for="number, key in numToArray">
            <div v-if="!number.startsWith('0')">
                <ClientOnly>
                    <layflags-rolling-number style="--roll-duration:750ms" :value="number">000</layflags-rolling-number>
                </ClientOnly>
                <span v-if="key < numToArray.length - 1">,</span>
            </div>
            <div v-if="number.startsWith('0')">
                {{ number }}<span v-if="key < numToArray.length - 1">,</span>
            </div>


        </div>
    </div>
</template>
