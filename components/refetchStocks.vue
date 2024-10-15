<script lang="ts" setup>
const stockStore = useStockstore()
const isLoading = ref(false)
async function fetchData() {
    try {
        isLoading.value = true
        await stockStore.fetchStocksData()
        $toast.success('Data refreshed successfully')
        isLoading.value = false
    } catch (error) {
        throw createError({
            status: 500,
            message: `${error}`,
            fatal: true
        })
    }
}
const stopInterval = false
// setInterval(async () => await fetchData(), 10000)
</script>
<template>
    <div>
        <button @click="fetchData" class="opacity-50 hover:opacity-100 group   hover:text-lime">
            <Icon size="24" class="group-hover:rotate-180 transition duration-700" name="solar:refresh-bold" :class="{
                'rotate-center': isLoading
            }" />
        </button>
    </div>
</template>
