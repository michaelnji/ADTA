<script lang="ts" setup>
import { objectEntries } from '@vueuse/core';
import { formatDistanceToNow, isFuture } from 'date-fns';

const stockStore = useStockstore()
const holidays = computed(() => {
    const data = stockStore.MarketStatus?.stockMarketHolidays.find((x) => x.year === new Date().getFullYear())
    return objectEntries(data ?? {}).filter((x, i) => i > 0 && isFuture(x[1]))
})
console.log(holidays.value)
</script>
<template>
    <div class=" rounded-3xl  md:p6 md:bg-stone-900 !bg-opacity-60 ">
        <h3 class="text-lg  !font-normal  opacity-80">Upcoming Holidays
        </h3>
        <div class="flex flex-col mt6 gap-3  ">
            <div class="flex gap-x-2" v-for="item in holidays">
                <h3 class="font-medium text-sm line-clamp-1 ">
                    {{ item[0] }}
                </h3>
                <p class="text-xs bg-lime text-lime bg-opacity-20 py.5 px2 rounded-lg">
                    in {{ formatDistanceToNow(item[1]) }}

                </p>
            </div>
        </div>
    </div>
</template>