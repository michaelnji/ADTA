<script setup>
const route = useRoute()
const title = computed(() => route.meta.title ?? 'TBD', "DJS")
const normalizationsStore = useNormalizationsStore()
const branchementsStore = useBranchementsStore()
const profilesStore = useProfilesStore()
const privilegeStore = usePrivilegesStore()
const internalFacturations = useFacturationsInternalStore()
const companyDataStore = useCompanyDataStore()

await Promise.all([
    await normalizationsStore.getNormalizations(),
    await branchementsStore.getBranchements(),
    await profilesStore.getProfiles(),
    await internalFacturations.getFacturations(),
    await companyDataStore.getCompanyData()
])

const client = useSupabaseClient()
const user = await client.auth.getUser()
profilesStore.setCurrentProfile(user.data.user.id)
await privilegeStore.getPrivileges()

</script>

<template>
    <div>
        <Html>

        <Head>
            <Title>{{ title }}</Title>
        </Head>

        <Body class="bg-white  dark:bg-black">
            <div class="wfull fixed z2">
                <Navbar />
            </div>
            <div class="wfull min-h-screen">

                <div class=" pt-20 pb-6  overflow-x-hidden">
                    <slot />
                </div>
            </div>
            <!-- <div class="wfull flex justify-center  lg:hidden fixed bottom-0 z-2">
                <BottomNavbar />
            </div> -->
        </Body>

        </Html>
    </div>
</template>
