<script setup lang="ts">
import { add, format } from 'date-fns';
import { cos, floor, isPrime, log, randomInt, sin } from 'mathjs';
const data: { volume: number, time: string }[] = []
for (let i = 0; i < 14; i++) {
    data.push({
        "volume": isPrime(i) ? i * randomInt(1, i + 1) - 2 : randomInt(1, i + 1) * 2,
        time: format(add(new Date, { minutes: i }), 'hh:mm')
    },)
}
</script>

<template>
    <div class="dark">
        <h3 class="text-lg  !font-normal  opacity-80">Volume Traded
        </h3>
        <BarChart :show-grid-line="false" :show-x-axis="false" :data="data" index="volume" :colors="['#aaa']"
            :rounded-corners="6" :categories="['volume']" :y-formatter="(tick, i) => {
                return typeof tick === 'number'
                    ? `${new Intl.NumberFormat('us').format(tick).toString()}`
                    : ''
            }" />
    </div>
</template>