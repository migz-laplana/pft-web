<template>
  <Container class="mx-auto">
    <Card class="mt-6 shadow-3">
      <template #content>
        <h1 class="text-4xl mb-7">Welcome, {{ user?.given_name }}!</h1>
        <h2 class="text-2xl mb-4">Your details</h2>
        <p>first name: {{ user?.given_name }}</p>
        <p>last name: {{ user?.family_name }}</p>
        <p>email: {{ user?.email }}</p>
        <p>role: {{ userStore.currentUser?.role }}</p>
      </template>
    </Card>
  </Container>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { user } = useAuth();
</script>
