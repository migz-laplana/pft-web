<template>
  <Container class="mx-auto">
    <Card class="mt-6 shadow-3">
      <template #content>
        <h1 class="text-4xl mb-7">
          Welcome, {{ userStore.currentUser?.firstName }}!
        </h1>
        <h2 class="text-2xl mb-4">Your details</h2>
        <p>first name: {{ userStore.currentUser?.firstName }}</p>
        <p>last name: {{ userStore.currentUser?.lastName }}</p>
        <p>email: {{ userStore.currentUser?.email }}</p>
        <p>role: {{ userStore.currentUser?.role }}</p>
      </template>
    </Card>
  </Container>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
</script>
