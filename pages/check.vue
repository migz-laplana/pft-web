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
definePageMeta({
  layout: "public",
});

const userStore = useUserStore();
const authenticatedUser = useSupabaseUser();
const route = useRoute();
const { getProfileDetails } = useProfile();

const destinationPath = route.query.dest?.toString();

onMounted(async () => {
  try {
    const profile = await getProfileDetails();
    userStore.setUserData(profile);

    let navPathTarget = destinationPath;

    if (
      (destinationPath === "/login" && authenticatedUser.value) ||
      destinationPath === "/check"
    ) {
      navPathTarget = "/";
    }

    await navigateTo(navPathTarget);
  } catch (error) {
    await navigateTo("/login");
  }
});
</script>
