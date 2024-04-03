<template>
  <div class="container">
    <div class="sign-in-container">
      <h1>Sign In</h1>
      <div class="input-block">
        <label for="email">Email:</label>
        <input id="email" v-model="email" />
      </div>
      <div class="input-block">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>

      <div class="sign-in-buttons-container">
        <button @click="signIn">Sign In</button>
      </div>
      <div v-if="isSignInError">Error with sign-in!!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import type { CurrentUser } from "~/types/common.types";

const email = ref<string>("");
const password = ref<string>("");
const isSignInError = ref<boolean>(false);
const userStore = useUserStore();

const signIn = async () => {
  isSignInError.value = false;

  try {
    const data = await $fetch<CurrentUser>("http://localhost:8080/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    userStore.setUserData(data);

    await navigateTo("/");
  } catch (e) {
    isSignInError.value = true;
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px;
}
.sign-in-container {
  text-align: center;
}

label {
  margin-right: 10px;
}

.input-block {
  margin-block: 12px;
}

.sign-in-buttons-container {
  margin-top: 40px;
}

.sign-in-buttons-container button {
  margin-inline: 10px;
}
</style>
