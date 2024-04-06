<template>
  <UContainer>
    <div class="mt-6 md:mt-40">
      <div class="max-w-md mx-auto border-2 rounded shadow-lg p-7">
        <h1 class="text-2xl mb-4 text-center">Physical Fitness Test App</h1>
        <h2 class="text-xl text-center">Sign In</h2>
        <UFormGroup label="Email" required class="my-6">
          <UInput
            v-model="email"
            icon="i-heroicons-envelope"
            placeholder="you@example.com"
            size="xl"
          />
        </UFormGroup>

        <UFormGroup label="Password" required class="my-6">
          <UInput
            v-model="password"
            icon="i-heroicons-lock-closed"
            placeholder="**********"
            size="xl"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                color="gray"
                :icon="showPasswordIcon"
                :padded="false"
                variant="link"
                @click="toggleShowPassword"
              />
            </template>
          </UInput>
        </UFormGroup>

        <div class="max-w-32 mx-auto">
          <UButton
            class="mt-10"
            size="lg"
            :loading="isSignInLoading"
            @click="signIn"
            :disabled="isSignInLoading"
            block
          >
            Sign In
          </UButton>
        </div>

        <UAlert
          v-if="isSignInError"
          class="mt-10"
          color="red"
          icon="i-heroicons-exclamation-triangle-solid"
          variant="subtle"
          title="Error signing in! Please try again."
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import type { CurrentUser } from "~/types/common.types";

const email = ref<string>("");
const password = ref<string>("");
const isSignInError = ref<boolean>(false);
const isSignInLoading = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const userStore = useUserStore();
const config = useRuntimeConfig();

const showPasswordIcon = computed(() =>
  showPassword.value ? "i-heroicons-eye" : "i-heroicons-eye-slash"
);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const signIn = async () => {
  isSignInLoading.value = true;
  isSignInError.value = false;

  try {
    const data = await $fetch<CurrentUser>(
      `${config.public.serviceBaseUrl}/auth/login`,
      {
        method: "POST",
        body: { email: email.value, password: password.value },
        credentials: "include",
      }
    );

    userStore.setUserData(data);

    await navigateTo("/");
  } catch (e) {
    isSignInError.value = true;
  } finally {
    isSignInLoading.value = false;
  }

  definePageMeta({
    layout: "public",
  });
};
</script>
