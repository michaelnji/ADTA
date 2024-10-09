<script setup lang="ts">

import { CurveType } from '@unovis/ts'
import { add, format } from 'date-fns';
import { cos, floor, isPrime, log, randomInt, sin } from 'mathjs';
const props = defineProps<{
    height: string;
    width: string
    data: { price: number, time: string }[],
    type?: 'line' | 'area'
}>()
const style = computed(() => `height:${props.height}; width: ${props.width}; padding:1rem;`)
const isLoading = ref(true)

onMounted(() => { isLoading.value = false })
</script>

<template>
    <div class="dark">
        <div class="rounded-2xl  max-wfull" v-if="props.type === 'area'">
            <AreaChart :style="style" :curve-type="CurveType.CatmullRom" :show-grid-line="false" :data="data"
                index="time" :colors="['#a9e34b']" :categories="[`price`]" :y-formatter="(tick) => {
                    return typeof tick === 'number'
                        ? `${new Intl.NumberFormat('us', { unitDisplay: 'long' }).format(tick).toString()}`
                        : ''
                }" />
        </div>
        <div class="rounded-2xl  max-wfull" v-if="props.type === 'line'">
            <LineChart :style="style" :curve-type="CurveType.CatmullRom" :show-grid-line="false" :data="data"
                index="time" :colors="['#a9e34b']" :categories="[`price`]" :y-formatter="(tick) => {
                return typeof tick === 'number'
                    ? `${new Intl.NumberFormat('us', { unitDisplay: 'long' }).format(tick).toString()}`
                    : ''
            }" />
        </div>
    </div>

</template>