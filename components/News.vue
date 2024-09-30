<script lang="ts" setup>
const fakeNews = [
    {
        title: 'Bitcoin Halving Delayed: Market Plunges',
        desc: "Crypto experts are speculating that the highly anticipated Bitcoin halving event has been postponed due to an unforeseen technical glitch. The news has sent shockwaves through the market, causing a sharp decline in Bitcoin's price...",
        img: 'https://doodleipsum.com/600/avatar?bg=ceebff'
    },
    {
        title: ' Elon Musk Announces New Cryptocurrency: DogeCoin 2.0',
        desc: "In a surprise announcement, Tesla CEO Elon Musk has revealed plans to launch a new cryptocurrency, DogeCoin 2.0. The token is expected to build on the success of DogeCoin and incorporate advanced blockchain technology..",
        img: 'https://doodleipsum.com/600/avatar?bg=ceebff'
    },
]
const chosenTab = ref('politics')
</script>
<template>
    <div>
        <div class="wfull">
            <h3 class="text-lg md:text-2xl !font-normal  opacity-80">Current News
            </h3>
            <div class="wfull rounded-3xl  md:px6 md:py8 md:bg-stone-900 !bg-opacity-60 mt4">
                <div class="max-w-xs wfull ">
                    <NewsTabSection :tab="chosenTab" @tab-change="(e) => chosenTab = e" />
                </div>
                <div class="mt6 grid gap-y-3">
                    <div class="rounded-xl transition duration-300 hover:bg-stone-900 p3 flex gap-x-4"
                        v-for="news in fakeNews">
                        <img :src="news.img" alt="" class="sm:size-28 size-20 rounded-md">
                        <div class="w-full">
                            <h3 class="sm:text-xl line-clamp-1 text-pretty !font-medium">{{ news.title }}
                            </h3>
                            <p class="sm:text-lg text-sm mt2 text-pretty font-light line-clamp-2 opacity-90 ">{{
                                news.desc }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>