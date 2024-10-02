<script lang="ts" setup>
import { randomInt } from 'mathjs';
import WebSocket from 'isomorphic-ws';
import { format } from 'date-fns';
const isConnected = ref(false);
const config = useRuntimeConfig()
const url = `${config.public.finnhubUrl}?token=${config.public.finnhubKey}`
type TimeSeries = {
    price: number, time: string
}
type VolumeSeries = {
    volume: number, time: string
}
const timeseries = ref<TimeSeries[]>([{ price: 224.6, time: format(Date.now(), 'hh:mm:ss').toString() }])
const timeseriesTemp = ref<TimeSeries[]>([])

const volumeseries = ref<VolumeSeries[]>([{ volume: 224.6, time: format(Date.now(), 'hh:mm:ss').toString() }])

const volumeseriesTemp = ref<VolumeSeries[]>([])

const currentPrice = computed(() => timeseries.value.length > 0 ? timeseries.value[timeseries.value.length - 1].price : timeseries.value[0].price)
const ws = new WebSocket(url);

ws.onopen = function open() {
    ws.send(JSON.stringify({
        'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT'
    }))

    isConnected.value = true

};

ws.onclose = function close() {
    isConnected.value = false

};

ws.onmessage = function incoming(data) {
    if (data.type !== 'heartbeat') {
        const info = JSON.parse(data.data.toString()).data[0]
        timeseriesTemp.value = [...timeseriesTemp.value, { price: info.p, time: format(new Date(info.t), 'hh:mm:ss').toString() }]
        volumeseriesTemp.value = [...volumeseriesTemp.value, { volume: info.v, time: format(new Date(info.t), 'hh:mm:ss').toString() }]

        if (timeseriesTemp.value.length > 6) {
            timeseries.value = [...timeseries.value, ...timeseriesTemp.value]
            volumeseries.value = [...volumeseries.value, ...volumeseriesTemp.value]
            timeseriesTemp.value = []
            volumeseriesTemp.value = []
        }
        if (timeseries.value.length > 100) {
            timeseries.value = timeseries.value.filter((x, i) => i > 3)
            volumeseries.value = volumeseries.value.filter((x, i) => i > 3)
        }
    }
    setTimeout(function timeout() {
        ws.send(JSON.stringify({ 'type': 'heartbeat', 'timestamp': Date.now() }));
    }, 500);
};
const unsubscribe = (symbol: string) => {
    ws.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
}

ws.onerror = ((e) => console.log(e))
onBeforeUnmount(() => {
    unsubscribe("AAPL")
    unsubscribe("BINANCE:BTCUSDT")
    ws.close()

})

</script>
<template>
    <div>
        <div class="wfull rounded-3xl  md:p6 md:py8 md:bg-stone-900 !bg-opacity-60">
            <h3 class="text-lg md:text-2xl !font-normal  opacity-80">Best Performer
            </h3>
            <div class=" mt4">
                <div class="flex  justify-between flex-col sm:flex-row text-white">
                    <div class="flex items-center gap-x-4">

                        <div>
                            <h3 class="font-bold flex items-center gap-x-2 font-display text-4xl sm:text-4xl  ">
                                BTC/USD


                            </h3>
                            <div class="flex lg:mt1 items-center gap-x-2">
                                <p class=" text-sm   opacity-80">BTC/USDT</p> -
                                <p class=" text-sm   opacity-80">Binance Exchange</p>

                            </div>
                        </div>

                    </div>
                    <div
                        class="flex mt4 sm:mt0 flex-col p3 rounded-xl border sm:p0 border-stone-800 sm:border-none sm:items-end gap-y-1">
                        <p class="md:text-4xl   text-3xl flex  gap-x-2 font-mono font-extrabold">
                            <span> $</span>
                            <AnimatedNumbers :format="true" :amount="currentPrice" :is-decimal="true" />
                        </p>
                        <div class="flex gap-x-2 mt1 items-center">
                            <p class=" text-sm p1 px3 bg-lime-500 bg-opacity-10 rounded-md "><b
                                    class="font-bold font-mono  text-lime-500">688.90</b> </p>
                            <p class=" text-sm p1 px3 bg-pink-500 bg-opacity-10 rounded-md "><b
                                    class="font-bold font-mono  text-pink-500">68.90</b> </p>
                        </div>
                    </div>
                </div>
                <div class="mt3 md:mt6 ">
                    <TrendChart :data="timeseries" height="15rem" width="100%" />
                    <div class="mt16 grid md:grid-cols-2 md:gap-8 xl:gap-12">
                        <div class="">
                            <VolumeChart :data="volumeseries" height="100%" width="100%" />
                        </div>
                        <div class="!mt12 grid  gap-6 ">
                            <div class="p3 rounded-xl flex gap-x-3 bg-stone-100 bg-opacity-5 items-center">
                                <div class="size-12 text-lime grid place-items-center">
                                    <Icon name="solar:chart-2-bold" size="30" />
                                </div>
                                <div>
                                    <h3 class="  text-base">Float Index</h3>
                                    <p class=" text-lg "><b class="font-bold font-mono  text-lime-500">6,550,098.90</b>
                                    </p>
                                </div>
                            </div>
                            <div class="p3 rounded-xl flex gap-x-3 bg-stone-100 bg-opacity-5 items-center">
                                <div class="size-12 text-lime grid place-items-center">
                                    <Icon name="solar:graph-new-linear" size="30" />
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
    </div>
</template>


<style></style>