<script lang="ts" setup>
import { useTimeoutPoll } from '@vueuse/core'
const stockStore = useStockstore()
const isLoading = ref(false)
async function fetchData() {

    try {
        isLoading.value = true
        await stockStore.fetchStocksData()
        $toast.success('Data refreshed successfully')
        isLoading.value = false
    } catch (error) {
        pause()
        throw createError({
            status: 500,
            message: `${error}`,
            fatal: true
        })
    }
}
const { isActive, pause, resume } = useTimeoutPoll(fetchData, 50000)
pause()
onMounted(async () => {
    resume()
})
</script>
<template>
    <div>
        <button @click="fetchData" class="opacity-50 hover:opacity-100 group   hover:text-lime" :class="{
            ' text-lime !opacity-100': isLoading
        }">
            <Icon size="24" class="group-hover:rotate-180 transition duration-700" name="solar:refresh-bold" :class="{
                'rotate-center': isLoading
            }" />
        </button>
    </div>
</template>
