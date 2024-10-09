<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { add, format } from 'date-fns';
import { cos, floor, isPrime, log, randomInt, sin } from 'mathjs';
const props = defineProps<{
    height: string;
    width: string
}>()
const style = computed(() => `height:${props.height}; width: ${props.width};`)
const isLoading = ref(true)
const data: { price: number, time: string }[] = []
for (let i = 0; i < 14; i++) {
    data.push({
        "price": isPrime(i) ? i * randomInt(1, i + 1) : i * randomInt(1, i + 1),
        time: format(add(new Date, { minutes: i }), 'hh:mm')
    },)
}
onMounted(() => { isLoading.value = false })
</script>

<template>
    <div class="dark">
        <div class="rounded-2xl  max-wfull">
            <AreaChart :style="style" :show-grid-line="false" :show-legend="false" :show-tooltip="false"
                :show-x-axis="false" :show-y-axis="false" class="wfull hfull" :data="data" index="time"
                :colors="['#a9e34b']" :categories="[`price`]" :y-formatter="(tick) => {
                    return typeof tick === 'number'
                        ? `${new Intl.NumberFormat('us', { unitDisplay: 'long' }).format(tick).toString()}`
                        : ''
                }" />
        </div>
    </div>

</template>