<script setup>
import WebSocket from 'isomorphic-ws';
const isConnected = ref(false);
const config = useRuntimeConfig()
const url = `${config.public.finnhubUrl}?token=${config.public.finnhubKey}`

const ws = new WebSocket(url);

ws.onopen = function open() {
    ws.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }))
    console.log('connected');
    isConnected.value = true

};

ws.onclose = function close() {
    isConnected.value = false
    console.log('disconnected');
};

ws.onmessage = function incoming(data) {
    setTimeout(function timeout() {
        ws.send(JSON.stringify({ 'type': 'heartbeat', 'timestamp': Date.now() }));
    }, 500);
};
const unsubscribe = (symbol) => {
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
