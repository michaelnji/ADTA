<script setup lang="ts">

const data = [
    { name: 'Jan', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Feb', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Mar', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Apr', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'May', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jun', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jul', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'May', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jun', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jul', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'May', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jun', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jul', volume: Math.floor(Math.random() * 2000) + 500, sell: Math.floor(Math.random() * 2000) + 500 },
]
</script>

<template>
    <div>
        <h3 class="text-lg  !font-normal  opacity-80">Volume Traded
        </h3>
        <BarChart :show-grid-line="false" :show-x-axis="false" :data="data" index="name" :colors="['#aaa']"
            :rounded-corners="6" :categories="['volume']" :y-formatter="(tick, i) => {
                return typeof tick === 'number'
                    ? `${new Intl.NumberFormat('us').format(tick).toString()}`
                    : ''
            }" />
    </div>
</template>