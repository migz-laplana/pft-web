export default defineNuxtPlugin(() => {
  const $customFetch = $fetch.create({
    async onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo("/logout");
      }
    },
  });

  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
