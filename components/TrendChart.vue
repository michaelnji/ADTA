<script setup lang="ts">

import { CurveType } from '@unovis/ts';
const props = defineProps<{
    height: string;
    width: string
    data: { price: number, time: string }[],
    type?: 'line' | 'area'
}>()
const style = computed(() => `height:${props.height}; width: ${props.width}; padding:0rem; padding:0em; margin:0em;`)
const isLoading = ref(true)

onMounted(() => { isLoading.value = false })
</script>

<template>
    <div class="dark">
        <div v-if="props.type === 'area'">
            <AreaChart :style="style" :curve-type="CurveType.CatmullRom" :show-grid-line="false" :data="data"
                index="time" :colors="['#a9e34b']" :categories="[`price`]" :y-formatter="(tick) => {
                    return typeof tick === 'number'
                        ? `${new Intl.NumberFormat('us', { unitDisplay: 'long' }).format(tick).toString()}`
                        : ''
                }" />
        </div>
        <div v-if="props.type === 'line'">
            <LineChart :style="style" :curve-type="CurveType.CatmullRom" :show-grid-line="false" :data="data"
                index="time" :colors="['#a9e34b']" :categories="[`price`]" :y-formatter="(tick) => {
                return typeof tick === 'number'
                    ? `${new Intl.NumberFormat('us', { unitDisplay: 'long' }).format(tick).toString()}`
                    : ''
            }" />
        </div>
    </div>

</template>