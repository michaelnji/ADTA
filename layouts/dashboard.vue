<script setup>
const route = useRoute()
const title = computed(() => route.meta.title ?? 'TBD', "DJS")
const normalizationsStore = useNormalizationsStore()
const branchementsStore = useBranchementsStore()
const internalFacturations = useFacturationsInternalStore()
const profilesStore = useProfilesStore()
const companyDataStore = useCompanyDataStore()
const privileges = usePrivilegesStore()
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
await privileges.getPrivileges()

if (!profilesStore.currentProfile.is_superuser) {
    client
        .channel('privileges_update')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'PRIVILEGES', filter: `requested_by=eq.${profilesStore.currentProfile.id}` }, (e) => {

            privileges.updateCurrentUserprivileges(e.new)
        })
        .subscribe()
    client
        .channel('privileges_insert')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'PRIVILEGES', filter: `requested_by=eq.${profilesStore.currentProfile.id}` }, () => {

        })
        .subscribe()

    client
        .channel('privileges_delete')
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'PRIVILEGES', filter: `requested_by=eq.${profilesStore.currentProfile.id}` }, (e) => {
            privileges.removeCurrentUserprivileges(profilesStore.currentProfile.id)
        })
        .subscribe()
}
if (profilesStore.currentProfile.is_superuser) {
    client
        .channel('privileges_insert-ad')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'PRIVILEGES' }, async () => {
            await privileges.getPrivileges()
        })
        .subscribe()
    client
        .channel('privileges_update-ad')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'PRIVILEGES' }, async () => {
            await privileges.getPrivileges()
        })
        .subscribe()

    client
        .channel('privileges_delete-ad')
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'PRIVILEGES' }, async () => {
            await privileges.getPrivileges()

        })
        .subscribe()

}
// })
</script>

<template>
    <div>
        <Html>

        <Head>
            <Title>{{ title }}</Title>
        </Head>

        <Body class="bg-white  dark:bg-black">
            <div class="wfull">
            </div>
            <div class="wfull flex min-h-screen">
                <div class="flex-basis-[13rem] xl:flex-basis-15rem  hidden lg:block">
                    <Sidebar />
                </div>
                <div class="!flex-grow-1   overflow-x-hidden">
                    <div class="w-full flex">
                        <div class=" fixed z-2 top-0 left-13rem xl:left-15rem right-0">
                            <Navbar />
                        </div>
                    </div>
                    <div class="mxa py-20 pt27  wfull">
                        <slot />
                    </div>
                </div>
            </div>
            <!-- <div class="wfull flex justify-center  lg:hidden fixed bottom-0 z-2">
                <BottomNavbar />
            </div> -->
        </Body>

        </Html>
    </div>
</template>
