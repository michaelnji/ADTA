<script lang="ts" setup>
const props = defineProps<{
    amount: number,
    isDecimal?: boolean,
    format?: boolean
}>()
</script>
<template>
    <ClientOnly>
        <div>
            <div v-if="isDecimal" class="flex">
                <Counter :format="true" :amount="Number.parseFloat(amount.toString().split('.')[0])" />.
                <Counter :format="false" :amount="Number.parseFloat(amount.toFixed(3).split('.')[1])" />
            </div>
            <div v-if="!isDecimal">
                <Counter :format="format" :amount="amount" />
            </div>
        </div>
    </ClientOnly>
</template>


<style></style>