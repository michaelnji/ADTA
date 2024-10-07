<script setup lang="ts">
// import ConnectionClient from '~/components/Connection.client.vue';

definePageMeta({
    title: 'ADTA - Markets',
    description: "ADTA - Markets"
})

</script>

<template>
    <div>

        <div class=" w-full overflow-x-hidden mt4 flex flex-col md:flex-row gap-12 p6 md:p12 lg:px-6 xl:px12  ">
            <div class="flex-basis-30rem">
                <MarketsList />
            </div>
            <div class="flex-grow-1">
                <div class="flex flex-col gap-y-12">

                </div>
            </div>
        </div>

    </div>
</template>

