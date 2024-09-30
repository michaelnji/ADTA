<script lang="ts" setup>
const route = useRoute();
const showTravailDropdown = ref(true)
const showEmployesDropdown = ref(false)
const links = ref([
    {
        label: "Aperçu",
        link: "/dashboard/apercu",
        icon: "solar:home-2-linear",
        iconActive: "solar:home-2-bold",
        isDropdown: false
    },
    {
        label: "Travail",
        icon: "solar:book-linear",
        iconActive: "solar:book-bold",
        isDropdown: true,
        links: [
            {
                label: "Anomalies",
                link: "/dashboard/travail/anomalies",
                icon: "solar:folder-open-linear",
                iconActive: "solar:folder-open-bold",

            },
            {
                label: "Branchements",
                link: "/dashboard/travail/branchements",
                icon: "solar:folder-open-linear",
                iconActive: "solar:folder-open-bold",

            },

            {
                label: "Normalizations",
                link: "/dashboard/travail/normalizations",
                icon: "solar:folder-open-linear",
                iconActive: "solar:folder-open-bold",

            },
            {
                label: "Facturations",
                link: "/dashboard/travail/facturations/view",
                icon: "solar:wallet-money-linear",
                iconActive: "solar:wallet-money-bold",

            },
            {
                label: "Rapports",
                link: "/dashboard/travail/rapports",
                icon: "solar:pie-chart-3-linear",
                iconActive: "solar:pie-chart-3-bold",

            },
        ]
    },
    {
        label: "Employes",
        icon: "solar:users-group-rounded-line-duotone",
        iconActive: "solar:users-group-rounded-bold",
        isDropdown: true,
        links: [
            {
                label: "Les employés",
                link: "/dashboard/employes/liste",
                icon: "solar:user-id-linear",
                iconActive: "solar:user-id-bold",

            },
            {
                label: "Infractions",
                link: "/dashboard/employes/infractions",
                icon: "solar:user-minus-rounded-linear",
                iconActive: "solar:user-minus-rounded-bold",

            },
            {
                label: "Plaintes",
                link: "/dashboard/employes/plaintes",
                icon: "solar:sad-circle-linear",
                iconActive: "solar:sad-circle-bold",

            },
            {
                label: "Demandes",
                link: "/dashboard/employes/demandes",
                icon: "solar:layers-minimalistic-linear",
                iconActive: "solar:layers-minimalistic-bold",

            },
            {
                label: "Rapports",
                link: "/dashboard/employes/rapports",
                icon: "solar:pie-chart-3-linear",
                iconActive: "solar:pie-chart-3-bold",

            },

        ]
    },
    {
        label: "Profil",
        link: "/dashboard/profil",
        icon: "solar:user-circle-linear",
        iconActive: "solar:user-circle-bold",
        isDropdown: false
    },
    {
        label: "Paramètres",
        link: "dashboard/parametres",
        icon: "solar:settings-linear",
        iconActive: "solar:settings-bold",
        isDropdown: false
    },
])
</script>
<template>
    <div
        class=" lg:fixed hidden lg:block h-full bg-stone-800 text-stone-50  z0 overflow-y-scroll overflow-x-hidden w-13rem xl:w-15rem">
        <div class=" p-7  bg-stone-900   min-wfull font-bold text-2xl ">
            DJ Services

        </div>
        <div class="mt4 flex flex-col content-between">
            <ul class="grid gap-y-3 p3 mt4">
                <div v-for="link, key in links" :key="key">
                    <NuxtLink :to="link.link" v-if="!link.isDropdown">
                        <li class="p3 hover:bg-stone-300 hover:text-stone-900    font-medium text-sm  rounded-xl transition  flex gap-x-4 items-center"
                            :class="{ 'bg-stone-100 text-stone-900 ': route.path === link.link }">
                            <Icon :name="link.icon" v-if="route.path !== link.link" size="20" />
                            <Icon :name="link.iconActive" v-if="route.path === link.link" size="20" />
                            {{ link.label }}
                        </li>
                    </NuxtLink>
                    <div v-if="link.isDropdown && link.label === 'Travail'">
                        <li v-on:click="() => {
                            if (showTravailDropdown) {
                                showTravailDropdown = false
                                return
                            }
                            showTravailDropdown = true
                            return

}" class="p3 cursor-pointer hover:bg-stone-300 text-stone-50 !bg-opacity-20   font-medium text-sm  rounded-xl transition  flex gap-x-4 items-center"
                            :class="{ 'bg-stone-400 text-stone-400 bg-opacity-20': showTravailDropdown }">
                            <Icon :name="link.icon" size="20" />

                            {{ link.label }}
                            <Icon name="solar:alt-arrow-down-linear" class="mla" size="20"
                                v-if="!showTravailDropdown" />
                            <Icon name="solar:alt-arrow-up-linear" class="mla" size="20" v-if="showTravailDropdown" />
                        </li>
                        <div class="mt3 ml2.5 transition-all grid gap-y-3" v-if="link.label === 'Travail'"
                            :class="{ 'visually-hidden': !showTravailDropdown }">
                            <NuxtLink v-for="innerLink, key in link.links" :key="key" :to="innerLink.link">
                                <li class="p3 hover:bg-stone-300 hover:text-stone-900   font-medium text-sm  rounded-xl transition  flex gap-x-4 items-center"
                                    :class="{ 'bg-stone-100 text-stone-900 ': route.path === innerLink.link }">
                                    <Icon :name="innerLink.icon" v-if="route.path !== innerLink.link" size="20" />
                                    <Icon :name="innerLink.iconActive" v-if="route.path === innerLink.link" size="20" />
                                    {{ innerLink.label }}
                                </li>
                            </NuxtLink>
                        </div>
                    </div>
                    <div v-if="link.isDropdown && link.label === 'Employes'">
                        <li v-on:click="() => {
                            if (showEmployesDropdown) {
                                showEmployesDropdown = false
                                return
                            }
                            showEmployesDropdown = true
                            return

}" class="p3 cursor-pointer hover:bg-stone-300 text-stone-50 !bg-opacity-20  font-medium text-sm  rounded-xl transition  flex gap-x-4 items-center"
                            :class="{ 'bg-stone-400 text-stone-400 bg-opacity-20': showEmployesDropdown }">
                            <Icon :name="link.icon" size="20" />

                            {{ link.label }}
                            <Icon name="solar:alt-arrow-down-linear" class="mla" size="20"
                                v-if="!showEmployesDropdown" />
                            <Icon name="solar:alt-arrow-up-linear" class="mla" size="20" v-if="showEmployesDropdown" />
                        </li>
                        <div class="mt3 ml2.5 transition-all grid gap-y-3"
                            :class="{ 'visually-hidden': !showEmployesDropdown }">
                            <NuxtLink v-for="innerLink, key in link.links" :key="key" :to="innerLink.link">
                                <li class="p3 hover:bg-stone-300 hover:text-stone-900   font-medium text-sm  rounded-xl transition  flex gap-x-4 items-center"
                                    :class="{ 'hover:bg-stone-100 hover:text-stone-900': route.path === innerLink.link }">
                                    <Icon :name="innerLink.icon" v-if="route.path !== innerLink.link" size="20" />
                                    <Icon :name="innerLink.iconActive" v-if="route.path === innerLink.link" size="20" />
                                    {{ innerLink.label }}
                                </li>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </ul>
            <p
                class="flex items-center  justify-center gap-x-2  px3 py1 text-sm font-medium wmax   rounded-full bg-indigo bg-opacity-15 text-indigo-300 ml6 mt-4">
                <Icon name="solar:info-circle-linear" />
                <span class="">version <b>0.1.15</b> </span>
            </p>
        </div>
    </div>
</template>
