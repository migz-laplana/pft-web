// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "nuxt-primevue", "@nuxtjs/kinde"],
  app: {
    head: {
      title: "Physical Fitness Test",
    },
  },
  runtimeConfig: {
    public: {
      serviceBaseUrl: "",
    },
  },
});
