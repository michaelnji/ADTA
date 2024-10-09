<script lang="ts" setup>
import { randomInt } from 'mathjs';
const props = defineProps<{
    symbol: string;
    price: number
    change: number
    // chartData: { time: string, price: number }[]
}>()
const priceChange = computed(() => props.change >= 0 ? `+${props.change}%` : `${props.change}%`)
</script>
<template>
    <div class="flex  p4 rounded-xl hover:bg-stone-900 trnsition duration-300 justify-between ">
        <div class="flex items-center gap-x-4">
            <!-- <div class="flex">

                        <div class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white">
                            <Icon name="flag:us-1x1" class="" size="40" />
                        </div>
                        <div
                            class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white ">
                            <Icon name="flag:ch-1x1" class="" size="40" />
                        </div>
                    </div> -->
            <div>
                <h3 class="font-bold flex  items-start gap-x-2 font-display text-xl">{{ symbol }}
                </h3>

                <p class=" text-base text-lime" :class="{ '!text-pink-500': change < 0 }">{{ priceChange }}</p>


            </div>

        </div>
        <div class="">
            <p class="text-xl flex  gap-x-2 font-mono font-extrabold">
                <span> $</span>
                <AnimatedNumbers :format="true" :amount="price" />
            </p>
            <div class="max-h-10rem mt2 overflow-hidden">

                <SparkLine height="3rem" width="6rem" />
            </div>
        </div>
    </div>
</template>
