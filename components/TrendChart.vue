<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { CurveType } from '@unovis/ts'
import { add, format } from 'date-fns';
import { cos, floor, isPrime, log, randomInt, sin } from 'mathjs';
const props = defineProps<{
    height: string;
    width: string
    data: { price: number, time: string }[]
}>()
const style = computed(() => `height:${props.height}; width: ${props.width};`)
const isLoading = ref(true)

onMounted(() => { isLoading.value = false })
</script>

<template>
    <div class="dark">
        <div class="rounded-2xl  max-wfull">
            <h2 class="font-medium mb-6 text-lg"></h2>
            <LineChart :style="style" :curve-type="CurveType.BasisOpen" :show-grid-line="false" :data="data"
                index="time" :colors="['#a9e34b']" :categories="[`price`]" :y-formatter="(tick) => {
                return typeof tick === 'number'
                    ? `${new Intl.NumberFormat('us', { unitDisplay: 'long' }).format(tick).toString()}`
                    : ''
            }" />
        </div>
    </div>

</template>