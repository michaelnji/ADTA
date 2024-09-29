<script setup lang="ts">
definePageMeta({
    title: 'DJ Services',
    description: "DJ services"
})

</script>

<template>
    <div>
        <ForexBanner />
        <div class=" mt4 grid xl:grid-cols-2 gap-12 p3 sm:p-6 sm:p12 max-w-full lg:px-12  xl:px-24 ">
            <BiggestInstrument />
            <div class="flex flex-col gap-12">
                <TopMovers />
                <News />
            </div>
        </div>
    </div>
</template>
