export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const $customFetch = $fetch.create({
    baseURL: config.public.serviceBaseUrl,
    credentials: "include",

    async onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo("/login");
      }
    },
  });

  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
