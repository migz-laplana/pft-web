<template>
  <div class="mt-4 md:mt-8 mx-auto px-2 lg:px-8">
    <Card class="w-full p-3 max-w-30rem block mx-auto shadow-3">
      <template #content>
        <h1 class="text-2xl mb-4 text-center">Physical Fitness Test App</h1>

        <h3 class="mt-7">You are currently logged out.</h3>
        <p>Please click the button below to sign back in.</p>
        <NuxtLink to="/api/login" external>
          <Button label="Sign back in" class="w-full mt-6" />
        </NuxtLink>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "public",
});
</script>
