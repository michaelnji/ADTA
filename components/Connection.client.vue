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
const timeseriesTemp = ref<TimeSeries[]>([])
const timeseries = ref<TimeSeries[]>([{ price: 224.6, time: format(Date.now(), 'hh:mm:ss').toString() }])

const volumeseries = ref<VolumeSeries[]>([{ volume: 224.6, time: format(Date.now(), 'hh:mm:ss').toString() }])

const volumeseriesTemp = ref<VolumeSeries[]>([])

const currentPrice = computed(() => timeseries.value.length > 0 ? timeseries.value[timeseries.value.length - 1].price : timeseries.value[0].price)
const ws = new WebSocket(url);

ws.onopen = function open() {
    ws.send(JSON.stringify({
        'type': 'subscribe', 'symbol': 'CHF/USD'
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
        <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
        <!-- <p>Transport: {{ transport }}</p> -->
    </div>
</template>
