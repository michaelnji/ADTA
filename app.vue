<script setup lang="ts">
import "vue-data-ui/style.css";
import '~/assets/css/toast-theme.css';
import '~/assets/css/animations.css';
const { progress, isLoading, error } = useLoadingIndicator({
  throttle: 400
})

</script>
<template>
  <div class="font-body font-normal   ">
    <div class="">
      <Transition name="fadex">
        <div class=" h-screen w-screen fixed z-999  grid place-items-center" v-if="isLoading && !error">
          <Icon name="svg-spinners:180-ring-with-bg" size="35" v-if="isLoading && !error" />
        </div>
      </Transition>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <!-- <div class="lg:hidden grid place-items-center">
      <h2>
        Pour utiliser cette application, ouvrez-la sur un écran plus grand
      </h2>
    </div> -->

  </div>
</template>

<style></style>