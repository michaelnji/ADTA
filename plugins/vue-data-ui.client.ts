import { VueUiSparkline, VueUiWheel } from "vue-data-ui";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VueUiSparkline", VueUiSparkline);
    nuxtApp.vueApp.component("VueUiWheel", VueUiWheel);

})