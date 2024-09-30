<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { add, format } from 'date-fns';
import { cos, floor, isPrime, log, randomInt, sin } from 'mathjs';
const isLoading = ref(true)
const data: { price: number, time: string }[] = []
for (let i = 0; i < 14; i++) {
    data.push({
        "price": isPrime(i) || isPrime(i * i) ? randomInt(randomInt(60000, i + 65000), randomInt(68000, 68000 * i + 1 / i * 100
        )) : randomInt(randomInt(50000, i + 54000), randomInt(55000, 60000)),
        time: format(add(new Date, { minutes: i }), 'hh:mm')
    },)
}
onMounted(() => { isLoading.value = false })
</script>

<template>
    <div class="dark">
        <div class="rounded-2xl  max-wfull">
            <h2 class="font-medium mb-6 text-lg"></h2>
            <LineChart :data="data" index="time" :colors="['#a9e34b']" :categories="[`price`]" :y-formatter="(tick) => {
                return typeof tick === 'number'
                    ? `${new Intl.NumberFormat('us', { unitDisplay: 'long' }).format(tick).toString()}`
                    : ''
            }" />
        </div>
    </div>

</template>