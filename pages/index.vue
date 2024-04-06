<template>
  <UHorizontalNavigation :links="navLinks" class="border-b border-gray-200" />
  <UContainer>
    <h1>home page</h1>
    <p>first name: {{ userStore.currentUser?.firstName }}</p>
    <p>last name: {{ userStore.currentUser?.lastName }}</p>
    <p>email: {{ userStore.currentUser?.email }}</p>
    <p>role: {{ userStore.currentUser?.role }}</p>
    <button @click="signOut">sign-out</button>
  </UContainer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const navLinks = [
  {
    label: "Profile",
    to: "/profile",
  },
  {
    label: "Classes",
    to: "/classes",
  },
];

const signOut = async () => {
  try {
    await $fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    userStore.setUserData(null);
    navigateTo("/login");
  } catch (e) {
    alert("failed to sign out!");
  }
};
</script>
