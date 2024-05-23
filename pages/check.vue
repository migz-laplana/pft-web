<template>
  <div class="h-screen w-full flex justify-content-center align-items-center">
    <div class="w-3/4 text-center flex flex-column items-center">
      <h1 class="text-3xl mb-12">Physical Fitness Test App</h1>
      <p class="text-lg mb-6">Loading app..</p>
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "public",
});

const userStore = useUserStore();
const route = useRoute();
const { getProfileDetails } = useProfile();

const destinationPath = route.query.dest?.toString();

onMounted(async () => {
  try {
    const profile = await getProfileDetails();

    userStore.setUserData(profile);

    let navPathTarget = destinationPath;

    if (destinationPath === "/check") {
      navPathTarget = "/";
    }

    await navigateTo(navPathTarget);
  } catch (error) {
    await navigateTo("/api/login", { external: true });
  }
});
</script>
