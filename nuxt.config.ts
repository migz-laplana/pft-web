// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/ui"],
  colorMode: {
    preference: "light",
  },
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
