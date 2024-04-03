<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "./stores/user";
import type { CurrentUser } from "./types/common.types";

const userStore = useUserStore();
const route = useRoute();

if (!userStore.currentUser && route.path !== '/login') {
  const { data, error } = await useFetch<CurrentUser>(
    "http:localhost:8080/auth/profile"
  );

  if (error) {
    navigateTo("/login");
  }

  userStore.setUserData(data.value!);
}
</script>
