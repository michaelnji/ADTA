<script setup lang="ts">
definePageMeta({
    title: 'ADTA - Home',
    description: "ADTA - Home"
})

</script>

<template>
    <div>
        <ForexBanner />
        <div class=" w-full overflow-x-hidden mt4 grid xl:grid-cols-2 gap-12 p6 md:p12 lg:px-12  ">
            <BiggestInstrument />
            <div class="flex flex-col gap-y-12">
                <TopMovers />
                <News />
            </div>
        </div>
    </div>
</template>
