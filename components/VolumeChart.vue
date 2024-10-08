<script setup lang="ts">
import { add, format } from 'date-fns';
import { cos, floor, isPrime, log, randomInt, sin } from 'mathjs';
const props = defineProps<{
    height: string;
    width: string,
    data: { volume: number, time: string }[]
}>()
const style = computed(() => `height:${props.height}; width: ${props.width};`)

</script>

<template>
    <div class="dark">
        <h3 class="text-sm  !font-normal  opacity-80">Volume Traded
        </h3>
        <BarChart :style="style" :show-grid-line="false" :data="data" index="time" :colors="['#aaa']"
            :rounded-corners="6" :categories="['volume']" :y-formatter="(tick, i) => {
                return typeof tick === 'number'
                    ? `${new Intl.NumberFormat('us').format(tick).toString()}`
                    : ''
            }" />
    </div>
</template>