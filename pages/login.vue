<template>
  <UContainer>
    <div class="mt-6 md:mt-40">
      <div class="max-w-md mx-auto border-2 rounded shadow-lg p-7">
        <h1 class="text-2xl mb-4 text-center">Physical Fitness Test App</h1>
        <h2 class="text-xl text-center">Sign In</h2>
        <UFormGroup label="Email" required class="my-6">
          <UInput
            v-model="emailInput"
            icon="i-heroicons-envelope"
            placeholder="you@example.com"
            size="xl"
          />
        </UFormGroup>

        <UFormGroup label="Password" required class="my-6">
          <UInput
            v-model="passwordInput"
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
            @click="handleSignIn"
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
import { useAuth } from "~/composables/useAuth";
import { mapDbEnumToRoleEnum } from "~/utils/roleEnumMapper";

const emailInput = ref<string>("");
const passwordInput = ref<string>("");
const showPassword = ref<boolean>(false);
const userStore = useUserStore();
const { signIn, isSignInLoading, isSignInError } = useAuth();

definePageMeta({
  layout: "public",
});

const showPasswordIcon = computed(() =>
  showPassword.value ? "i-heroicons-eye" : "i-heroicons-eye-slash"
);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSignIn = async () => {
  const data = await signIn({
    email: emailInput.value,
    password: passwordInput.value,
  });
  if (!data) return;
  const { _id, firstName, lastName, role, email } = data;
  userStore.setUserData({
    _id,
    firstName,
    lastName,
    role: mapDbEnumToRoleEnum(role),
    email,
  });
  await navigateTo("/");
};
</script>
