<template>
    <div class="wfull hmax">
        <h3 class="text-lg md:text-2xl !font-normal  opacity-80">Top Movers</h3>
        <div class="grid lg:grid-cols-2  mt4 gap-4 md:gap-8">
            <div class="flex  justify-between  text-white py3 sm:p6 sm:rounded-2xl sm:bg-stone-900 !bg-opacity-60">
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
                        <h3 class="font-bold flex  items-start gap-x-2 font-display text-xl">USD/CHF
                        </h3>
                        <div class="flex lg:mt1  items-center gap-x-2">
                            <p class=" text-base   opacity-80">FX</p> -
                            <p class=" text-base   opacity-80">New York</p>

                        </div>
                    </div>

                </div>
                <div class="">
                    <p class="text-xl flex  gap-x-2 font-mono font-extrabold">
                        <span> $</span>
                        <AnimatedNumbers :format="true" :amount="randomInt(6, 680)" />
                    </p>
                    <div class="flex gap-x-2 mt1 items-center">
                        <p class=" text-sm sm:p1 sm:px3 sm:bg-lime  rounded-md "><b
                                class="font-extrabold font-mono text-lime-500 sm:text-black">+0.9%</b> <span
                                class="opacity-70"></span>
                        </p>

                    </div>
                </div>
            </div>
            <div class="flex  justify-between  text-white py3 sm:p6 sm:rounded-2xl sm:bg-stone-900 !bg-opacity-60">
                <div class="flex items-center gap-x-4">
                    <!-- <div class="flex">

                        <div class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white">
                            <Icon name="flag:us-1x1" class="" size="40" />
                        </div>
                        <div
                            class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white ">
                            <Icon name="flag:gb-1x1" class="" size="40" />
                        </div>
                    </div> -->
                    <div>
                        <h3 class="font-bold flex  items-start gap-x-2 font-display text-xl">USD/GBP
                        </h3>
                        <div class="flex lg:mt1  items-center gap-x-2">
                            <p class=" text-base   opacity-80">FX</p> -
                            <p class=" text-base   opacity-80">New York</p>

                        </div>
                    </div>

                </div>
                <div class="">
                    <p class="text-xl flex  gap-x-2 font-mono font-extrabold">
                        <span> $</span>
                        <AnimatedNumbers :format="true" :amount="randomInt(6, 680)" />
                    </p>
                    <div class="flex gap-x-2 mt1 items-center">
                        <p class=" text-sm sm:p1 sm:px3 sm:bg-lime  rounded-md "><b
                                class="font-extrabold font-mono text-lime-500 sm:text-black">+0.9%</b> <span
                                class="opacity-70"></span>
                        </p>

                    </div>
                </div>
            </div>
            <div class="flex  justify-between  text-white py3 sm:p6 sm:rounded-2xl sm:bg-stone-900 !bg-opacity-60">
                <div class="flex items-center gap-x-4">
                    <!-- <div class="flex">


                        <div
                            class="size-16 rounded-full hidden sm:grid overflow-hidden border-4 border-white place-items-center p3 bg-lime">
                            <Icon name="solar:waterdrop-bold" class="text-lime-500 sm:text-black" size="30" />
                        </div>
                    </div> -->
                    <div>
                        <h3 class="font-bold flex items-start gap-x-2 font-display text-xl">USDOIL
                        </h3>
                        <div class="flex lg:mt1  items-center gap-x-2">
                            <p class=" text-base   opacity-80">FX</p> -
                            <p class=" text-base   opacity-80">New York</p>

                        </div>
                    </div>

                </div>
                <div class="">
                    <p class="text-xl flex  gap-x-2 font-mono font-extrabold">
                        <span> $</span>
                        <AnimatedNumbers :format="true" :amount="randomInt(6, 680)" />
                    </p>
                    <div class="flex gap-x-2 mt1 items-center">
                        <p class=" text-sm sm:p1 sm:px3 sm:bg-lime  rounded-md "><b
                                class="font-extrabold font-mono text-lime-500 sm:text-black">+0.9%</b> <span
                                class="opacity-70"></span>
                        </p>

                    </div>
                </div>
            </div>
            <div class="flex  justify-between  text-white py3 sm:p6 sm:rounded-2xl sm:bg-stone-900 !bg-opacity-60">
                <div class="flex items-center gap-x-4">
                    <!-- <div class="flex">

                        <div class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white">
                            <Icon name="flag:us-1x1" class="" size="40" />
                        </div>
                        <div
                            class="size-12 rounded-full hidden sm:grid overflow-hidden border-4 border-white ">
                            <Icon name="flag:jp-1x1" class="" size="40" />
                        </div>
                    </div> -->
                    <div>
                        <h3 class="font-bold flex  items-start gap-x-2 font-display text-xl">USD/JPY
                        </h3>
                        <div class="flex lg:mt1  items-center gap-x-2">
                            <p class=" text-base   opacity-80">FX</p> -
                            <p class=" text-base   opacity-80">New York</p>

                        </div>
                    </div>

                </div>
                <div class="">
                    <p class="text-xl flex  gap-x-2 font-mono font-extrabold">
                        <span> $</span>
                        <AnimatedNumbers :format="true" :amount="randomInt(6, 680)" />
                    </p>
                    <div class="flex gap-x-2 mt1 items-center">
                        <p class=" text-sm sm:p1 sm:px3 sm:bg-lime  rounded-md "><b
                                class="font-extrabold font-mono text-lime-500 sm:text-black">+0.9%</b> <span
                                class="opacity-70"></span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { randomInt } from 'mathjs';


</script>

<style></style>