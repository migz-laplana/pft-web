<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-3/4 text-center flex flex-col items-center">
      <h1 class="text-3xl mb-12">Physical Fitness Test App</h1>
      <p class="text-lg mb-6">Loading app..</p>
      <div class="w-64">
        <UProgress animation="carousel" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import type { CurrentUser } from "~/types/common.types";

const userStore = useUserStore();
const appStore = useAppStore();
const config = useRuntimeConfig();

onMounted(async () => {
  try {
    const data = await $fetch<CurrentUser>(
      `${config.public.serviceBaseUrl}/auth/profile`,
      {
        credentials: "include",
      }
    );

    userStore.setUserData(data);
    const { initialRoutePath } = appStore;
    await navigateTo(initialRoutePath === "/check" ? "/" : initialRoutePath);
  } catch (error) {
    await navigateTo("/login");
  }
});

definePageMeta({
  layout: "public",
});
</script>
