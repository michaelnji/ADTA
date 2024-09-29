export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@unocss/nuxt",
    // "@nuxtjs/color-mode",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@morev/vue-transitions/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/supabase",
  ],
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },

    provider: "local",
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  icon: {
    clientBundle: {
      icons: [
        'solar:info-circle-linear',
        "solar:settings-bold",
        "svg-spinners:180-ring-with-bg",
        "mingcute:sparkles-fill",
        "solar:flag-linear",
        "solar:verified-check-bold",
      ],
    },
  },
  // supabase: {
  //   redirect: false,
  //   clientOptions: {
  //     auth: {
  //       autoRefreshToken: false,
  //       detectSessionInUrl: false,
  //       persistSession: false,
  //     }
  //   },
  //   cookieName: "djs",
  //   cookieOptions: {
  //     maxAge: 60 * 60,
  //     sameSite: "lax",
  //     secure: true,


  //   },
  //   types: "./types/database.types.ts",
  // },
  vue: {
    compilerOptions: {
      isCustomElement: ((tag) => tag.includes('layflags-rolling-number'))
    }
  }
});
