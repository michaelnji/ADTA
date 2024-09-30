<script lang="ts" setup>
import { randomInt } from 'mathjs';


</script>
<template>
    <div>
        <div class="wfull rounded-3xl  md:p6 md:py8 md:bg-stone-900 !bg-opacity-60">
            <h3 class="text-lg md:text-2xl !font-normal  opacity-80">Best Performer
            </h3>
            <div class=" mt4">
                <div class="flex  justify-between flex-col sm:flex-row text-white">
                    <div class="flex items-center gap-x-4">
                        <div class="">
                            <Icon name="cryptocurrency:btc" class="hidden lg:block" size="60" />
                            <Icon name="cryptocurrency:btc" class=" lg:hidden" size="50" />
                        </div>
                        <div>
                            <h3 class="font-bold flex items-center gap-x-2 font-display text-4xl sm:text-5xl">S&P 500
                                <Icon name="solar:crown-star-bold-duotone" class="text-green-500 hidden lg:block"
                                    size="30" />

                            </h3>
                            <div class="flex lg:mt1 items-center gap-x-2">
                                <p class=" text-sm   opacity-80">BTC</p> -
                                <p class=" text-sm   opacity-80">OKX Exchange</p>

                            </div>
                        </div>

                    </div>
                    <div
                        class="flex mt4 sm:mt0 flex-col p3 rounded-xl border sm:p0 sm:border-none sm:items-end gap-y-1">
                        <p class="md:text-5xl  text-3xl flex  gap-x-2 font-mono font-extrabold">
                            <span> $</span>
                            <AnimatedNumbers :format="true" :amount="randomInt(60000, 68000)" />
                        </p>
                        <div class="flex gap-x-2 mt1 items-center">
                            <p class=" text-sm p1 px3 bg-lime-500 bg-opacity-10 rounded-md "><b
                                    class="font-bold font-mono  text-lime-500">68,098.90</b> <span
                                    class="opacity-70">high</span></p>
                            <p class=" text-sm p1 px3 bg-pink-500 bg-opacity-10 rounded-md "><b
                                    class="font-bold font-mono  text-pink-500">65,098.90</b> <span
                                    class="opacity-70">low</span></p>
                        </div>
                    </div>
                </div>
                <div class="mt3 md:mt6">
                    <TrendChart />
                    <div class="mt12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        <div class="p3 rounded-xl flex gap-x-3 bg-stone-100 bg-opacity-5 items-center">
                            <div class="size-12 text-lime grid place-items-center">
                                <Icon name="solar:chart-2-bold" size="30" />
                            </div>
                            <div>
                                <h3 class="  text-base">Float Index</h3>
                                <p class=" text-lg "><b class="font-bold font-mono  text-lime-500">6,550,098.90</b></p>
                            </div>
                        </div>
                        <div class="p3 rounded-xl flex gap-x-3 bg-stone-100 bg-opacity-5 items-center">
                            <div class="size-12 text-lime grid place-items-center">
                                <Icon name="mingcute:chart-line-line" size="30" />
                            </div>
                            <div>
                                <h3 class="  text-base">% up today</h3>
                                <p class=" text-lg "><b class="font-bold font-mono  text-lime-500">65.0</b></p>
                            </div>
                        </div>
                        <div class="p3 rounded-xl flex gap-x-3 bg-stone-100 bg-opacity-5 items-center">
                            <div class="size-12 text-lime grid place-items-center">
                                <Icon name="solar:course-up-linear" size="30" />
                            </div>
                            <div>
                                <h3 class="  text-base">Sentiment</h3>
                                <p class=" text-lg "><b class="font-bold font-mono  text-lime-500">Bullish</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>