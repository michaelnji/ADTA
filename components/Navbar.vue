<script lang="ts" setup>
const links = ref([
    {
        label: "overview",
        link: "/",
        icon: "solar:widget-linear",
        iconActive: "solar:widget-bold",

    },
    {
        label: "markets",
        link: "/markets",
        icon: "solar:graph-linear",
        iconActive: "solar:graph-bold",

    },
    {
        label: "radar",
        link: "/radar",
        icon: "solar:radar-2-linear",
        iconActive: "solar:radar-2-bold",

    },
    {
        label: "strategies",
        link: "/strategies",
        icon: "solar:branching-paths-up-linear",
        iconActive: "solar:branching-paths-up-bold",

    },
    {
        label: "stats",
        link: "/stats",
        icon: "solar:stars-linear",
        iconActive: "solar:stars-bold",

    },
    {
        label: "settings",
        link: "/settings",
        icon: "solar:settings-minimalistic-linear",
        iconActive: "solar:settings-minimalistic-bold",

    },

])
const route = useRoute()
const elv = useTemplateRef('elv')
const elvtwo = useTemplateRef('elvtwo')
const distanceVar = useCssVar('--distance', elv)
const distanceVarTwo = useCssVar('--distance-two', elvtwo)

onMounted(() => {
    setTimeout(() => {
        distanceVar.value = `${links.value.indexOf(links.value.find((x) => x.link === route.fullPath) ?? links.value[0]) * 4}rem`
        distanceVarTwo.value = `${links.value.indexOf(links.value.find((x) => x.link === route.fullPath) ?? links.value[0]) * 4}rem`
    }, 100)
})

</script>
<template>
    <ClientOnly>
        <div
            class="p4  rounded-full fixed hidden sm:block wfull bg-stone-950 bottom-6 left-1/2 -translate-x-1/2 z-1 shadow-xl  !max-w-max">
            <div class="relative flex items-center gap-x-2">
                <NuxtLink @click="() => {
                    distanceVar = `${i * 4}rem`
                    distanceVarTwo = `${i * 4}rem`
                }" class="z-1" v-for="link, i in links" :to="link.link">
                    <div class="size-14  z-1 opacity-50 lg:hover:opacity-100 active:!opacity-50  grid place-items-center group rounded-full"
                        :class="{
                            'text-black !opacity-100': route.fullPath === link.link
                        }">
                        <Icon :name="link.icon" size="35" />
                    </div>
                </NuxtLink>
                <div style=" transform: translateX(var(--distance))" ref="elv"
                    class="size-14 transiti duration-300  p2 absolute left-0 top-0 bottom-0 bg-lime rounded-full ">
                </div>
            </div>
        </div>
        <div
            class="p4 grid place-items-center rounded-t-2xl fixed  sm:hidden wfull bg-stone-950  bottom-0 left-0 right-0 z-10 ">
            <div class="relative flex items-center gap-x-2">
                <div class="z-1" v-for="link, i in links">
                    <NuxtLink @click="() => {
                        distanceVar = `${i * 4}rem`
                        distanceVarTwo = `${i * 4}rem`

                    }" class="z-1" v-if="i < 5" :to="link.link">
                        <div class=" size-14    opacity-50 lg:hover:opacity-100 active:!opacity-50  grid place-items-center group rounded-full"
                            :class="{
                                'text-black scale-105 !opacity-100': route.fullPath === link.link
                            }">
                            <Icon :name="link.iconActive" size="32" />
                        </div>
                    </NuxtLink>
                </div>
                <div style=" --distance-two:0rem; transform: translateX(var(--distance-two))" ref="elvtwo"
                    class="size-14 transition duration-300  p2 absolute left-0 top-0 bottom-0 bg-lime rounded-full ">
                </div>
            </div>
        </div>
    </ClientOnly>
</template>


<style></style>