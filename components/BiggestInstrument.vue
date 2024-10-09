<script lang="ts" setup>
import { number } from "mathjs";
import { isSaturday, isWeekend, subDays } from "date-fns";
import { format } from "date-fns/format";
import WebSocket from "isomorphic-ws";
import type { ServerResponse, StatusCode } from "~/server/types";
import type { Timeseries } from "~/server/types/fx.types";
import type { Quote12, Stock } from "~/types/index.types";
type TS = {
    price: number;
    time: string;
};
type VolumeSeries = {
    volume: number;
    time: string;
};
const isConnected = ref(false);
const config = useRuntimeConfig();
const url = `${config.public.finnhubUrl}?token=${config.public.finnhubKey}`;
const props = defineProps<{
    stock: Stock;
}>();
const stockStore = useStockstore()
const timeseries = ref<TS[]>([]);

const volumeseries = ref<VolumeSeries[]>([]);
const isLoading = ref(true);
const currentPrice = ref("");
const ws = new WebSocket(url);
const quote = ref<Quote12>();
ws.onopen = function open() {
    ws.send(
        JSON.stringify({
            type: "subscribe",
            symbol: props.stock.displaySymbol,
        }),
    );

    isConnected.value = true;
};

ws.onclose = function close() {
    isConnected.value = false;
};

ws.onmessage = function incoming(data) {
    if (JSON.parse(data.data.toString()).data) {
        const info = JSON.parse(data.data.toString()).data[0];
        if (info) {
            currentPrice.value = `${info.p}`;
        }
    }
    setTimeout(function timeout() {
        ws.send(JSON.stringify({ type: "heartbeat", timestamp: Date.now() }));
    }, 500);
};
const unsubscribe = (symbol: string) => {
    ws.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
};
onMounted(async () => {
    try {
        // $toast.info(stockStore.MarketStatus?.afterHours.toString() ?? '')
        const now = new Date();
        const resp = await $fetch<ServerResponse<StatusCode, Quote12>>(
            "/api/stocks/quote",
            {
                method: "POST",
                body: {
                    displaySymbol: props.stock.displaySymbol,
                },
                onResponseError({ response }) {
                    $toast.error(genErrorMessage(response._data.message, 500));
                },
            },
        );
        if (resp.ok && resp.data) {
            quote.value = resp.data;
        }
        if (
            (!isWeekend(now) && quote.value?.is_market_open) ||
            (!isWeekend(now) && !quote.value?.is_market_open && now.getHours() > 15)
        ) {
            const resp = await $fetch<
                ServerResponse<StatusCode, Timeseries["values"]>
            >("/api/timeseries/stock", {
                method: "POST",
                body: {
                    symbol: props.stock.displaySymbol,
                    interval: "5min",
                    // outputsize: 20000,
                    date: "today",
                },
                onResponseError({ response }) {
                    $toast.error(genErrorMessage(response._data.message, 500));
                },
            });
            if (resp.ok && resp.data) {
                const reversedData = resp.data.reverse();
                for (const element of reversedData) {
                    if (reversedData.indexOf(element) % 5 === 0) {
                        const v = {
                            time: format(element.datetime, "hh:mm aaa"),
                            volume: Number.parseInt(element.volume),
                        };

                        volumeseries.value = [...volumeseries.value, v];
                    }

                    const s = {
                        time: format(element.datetime, "hh:mm aaa"),
                        price: Number.parseFloat(element.close),
                    };

                    timeseries.value = [...timeseries.value, s];
                }
                currentPrice.value =
                    timeseries.value[timeseries.value.length - 1].price.toString();
                isLoading.value = false;
            }
        }
        else if (!stockStore.MarketStatus?.isTheStockMarketOpen) {
            const resp = await $fetch<
                ServerResponse<StatusCode, Timeseries["values"]>
            >("/api/timeseries/stock", {
                method: "POST",
                body: {
                    symbol: props.stock.displaySymbol,
                    interval: "1min",
                    // outputsize: 20000,
                    date: 'yesterday',
                },
                onResponseError({ response }) {
                    $toast.error(genErrorMessage(response._data.message, 500));
                },
            });

            if (resp.ok && resp.data) {
                const reversedData = resp.data.reverse();
                for (const element of reversedData) {
                    if (reversedData.indexOf(element) % 60 === 0) {
                        const v = {
                            time: format(element.datetime, "hh:mm aaa"),
                            volume: Number.parseInt(element.volume),
                        };

                        volumeseries.value = [...volumeseries.value, v];
                    }
                    const s = {
                        time: format(element.datetime, "hh:mm aaa"),
                        price: Number.parseInt(element.close),
                    };

                    timeseries.value = [...timeseries.value, s];
                }
                currentPrice.value =
                    timeseries.value[timeseries.value.length - 1].price.toString();
                isLoading.value = false;
            }
        }

        else if (isWeekend(now)) {
            const resp = await $fetch<
                ServerResponse<StatusCode, Timeseries["values"]>
            >("/api/timeseries/stock", {
                method: "POST",
                body: {
                    symbol: props.stock.displaySymbol,
                    interval: "5min",
                    // outputsize: 20000,
                    date: isSaturday(now)
                        ? format(new Date(subDays(now, 1).setHours(7)), "yyyy-LL-dd")
                        : format(new Date(subDays(now, 2).setHours(7)), "yyyy-LL-dd"),
                },
                onResponseError({ response }) {
                    $toast.error(genErrorMessage(response._data.message, 500));
                },
            });

            if (resp.ok && resp.data) {
                const reversedData = resp.data.reverse();
                for (const element of reversedData) {
                    if (reversedData.indexOf(element) % 60 === 0) {
                        const v = {
                            time: format(element.datetime, "hh:mm aaa"),
                            volume: Number.parseInt(element.volume),
                        };

                        volumeseries.value = [...volumeseries.value, v];
                    }
                    const s = {
                        time: format(element.datetime, "hh:mm aaa"),
                        price: Number.parseInt(element.close),
                    };

                    timeseries.value = [...timeseries.value, s];
                }
                currentPrice.value =
                    timeseries.value[timeseries.value.length - 1].price.toString();
                isLoading.value = false;
            }
        }

        else {
            isLoading.value = false;
        }
    } catch (error) { }
});
onBeforeUnmount(() => {
    unsubscribe(props.stock.displaySymbol ?? "");
    // ws.close()
});
</script>
<template>
    <div>
        <div class="wfull rounded-3xl  md:p6 md:py8 md:bg-stone-900 !bg-opacity-60">
            <h3 class="text-lg !font-normal  opacity-80">Best Performer
            </h3>
            <div class=" mt4">
                <div class="flex  justify-between flex-col sm:flex-row text-white">
                    <div class="flex items-center gap-x-4">

                        <div>
                            <h3 class="font-bold flex items-center gap-x-2 font-display text-4xl  ">
                                {{ stock.displaySymbol }}



                            </h3>
                            <p v-if="!isLoading" :class="{
                                ' !text-pink ': Number.parseFloat(quote?.percent_change ?? '') < 0,
                                ' !text-lime ': Number.parseFloat(quote?.percent_change ?? '') >= 0,

                            }" class=" text-sm  my1"><b class="font-extrabold font-mono  "><span
                                        v-if="Number.parseFloat(quote?.percent_change ?? '') >= 0">+</span>{{
    Number.parseFloat(quote?.percent_change ?? '').toFixed(3)
}}%</b> <span class="opacity-70"></span>
                            </p>
                            <div class="flex lg:mt1 items-center gap-x-2" v-if="!isLoading">
                                <p class=" text-sm   opacity-80">{{ quote?.name }}</p>
                                <p class=" text-sm text-lime font-bold   opacity-80">{{ quote?.exchange }}</p>

                            </div>
                            <Skeleton v-if="isLoading" class="my1 h5 w-15 bg-stone-900 rounded-md "> </Skeleton>
                            <div class="flex mt2 items-center gap-x-2" v-if="isLoading">
                                <Skeleton v-if="isLoading" class=" h5 w-15 bg-stone-900 rounded-md "> </Skeleton>
                                <Skeleton v-if="isLoading" class=" h5 w-15 bg-stone-900 rounded-md "> </Skeleton>

                            </div>

                        </div>

                    </div>
                    <div class="flex mt4 sm:mt0 flex-col  sm:items-end gap-y-1">
                        <p class="   text-3xl  flex items-center  gap-x-2 font-medium">
                            <span> $</span>
                            <AnimatedNumbers :format="true" :amount="Number.parseFloat(currentPrice)"
                                :is-decimal="true" />



                        </p>
                        <div class="flex gap-x-2 mt1 items-center">
                            <p v-if="!isLoading"
                                class=" text-sm p1 px3 text-lime-500 bg-lime-500 flex items-center justify-center gap-x-1 bg-opacity-10 rounded-md ">
                                <Icon name="solar:arrow-up-linear" />
                                <b class="font-medium">
                                    {{ Number.parseFloat(quote?.high ??
                                        '').toFixed(3) }}
                                </b>
                            </p>
                            <Skeleton v-if="isLoading"
                                class=" h7 w-15 bg-stone-900 flex items-center justify-center gap-x-1 rounded-md ">
                            </Skeleton>
                            <Skeleton v-if="isLoading"
                                class=" h7 w-15 bg-stone-900 flex items-center justify-center gap-x-1 rounded-md ">
                            </Skeleton>

                            <p v-if="!isLoading"
                                class=" text-sm p1 px3 bg-pink-500  bg-opacity-10 rounded-md flex items-center justify-center gap-x-1 text-pink-500">
                                <Icon name="solar:arrow-down-linear" />
                                <b class="font-medium ">
                                    {{ Number.parseFloat(quote?.low ??
                                        '').toFixed(3) }}
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mt3 md:mt6 ">
                    <TrendChart type="line" title="price" v-if="!isLoading" :data="timeseries" height="21rem"
                        width="100%" />
                    <Skeleton v-if="isLoading" class=" h-21rem bg-stone-900 w-full  rounded-2xl "> </Skeleton>
                    <div class=" grid md:grid-cols-2 gap-4 md:gap-x-12">
                        <div class="mt16" v-if="!isLoading">
                            <VolumeChart :data="volumeseries" height="13rem" width="100%" />
                        </div>

                        <Skeleton v-if="isLoading" class=" h-13rem bg-stone-900 w-full  rounded-2xl mt6 "> </Skeleton>

                        <div v-if="isLoading" class="!mt12 grid  gap-6 ">
                            <Skeleton class="py2 px6 rounded-xl bg-stone-900">

                            </Skeleton>
                            <Skeleton class="py2 px6 rounded-xl bg-stone-900">

                            </Skeleton>
                            <Skeleton class="py2 px6 rounded-xl bg-stone-900">

                            </Skeleton>

                        </div>
                        <div v-if="!isLoading" class="!mt12 grid  gap-3">

                            <div class="p3 rounded-xl flex gap-x-3 border border-stone-800 items-center">

                                <div class="flex gap-3 justify-between wfull">
                                    <div>
                                        <h3 class="  text-sm">Pevious Close</h3>
                                        <p class=" text-lg "><b class="font-medium ">{{
                                            Number.parseFloat(stock.previous_close ?? '0').toFixed(2) }}</b>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 class="  text-sm">Float</h3>
                                        <p class=" text-lg "><b class="font-medium ">{{
                                            Number.parseFloat(stock.float ?? '0').toFixed(2) }}</b>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 class="  text-sm">Relative Volume</h3>
                                        <p class=" text-lg "><b class="font-medium ">{{
                                            Number.parseFloat(stock.rv ?? '0').toFixed(2) }}</b>
                                        </p>
                                    </div>


                                </div>
                            </div>
                            <div class="p3 rounded-xl flex gap-x-3 border border-stone-800 items-center">

                                <div class="flex gap-3 justify-between wfull">
                                    <div>
                                        <h3 class="  text-sm">Year high</h3>
                                        <p class=" text-lg "><b class="font-medium text-lime-500">{{
                                            Number.parseFloat(quote?.fifty_two_week.high ?? '0').toFixed(2) }}</b>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 class="  text-sm">Year low</h3>
                                        <p class=" text-lg "><b class="font-medium text-pink-500">{{
                                            Number.parseFloat(quote?.fifty_two_week.low ?? '0').toFixed(2) }}</b>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 class="  text-sm">% change</h3>
                                        <p class=" text-lg "><b class="font-medium ">{{
                                            Number.parseFloat(quote?.fifty_two_week.high_change_percent ??
                                                '0').toFixed(2) }}</b>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div class="p3 rounded-xl flex gap-x-3 border border-stone-800 items-center">
                                <div class="size-12 text-lime grid place-items-center">
                                    <Icon name="solar:course-up-linear" size="24" />
                                </div>
                                <div>
                                    <h3 class="  text-sm">Sentiment</h3>
                                    <p class=" text-lg "><b class="font-medium text-lime-500">{{
                                        stock.sentiment }}</b></p>
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