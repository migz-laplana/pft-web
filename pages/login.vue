<template>
  <div class="mt-4 md:mt-8 mx-auto px-2 lg:px-8">
    <Card class="w-full p-3 max-w-30rem block mx-auto shadow-3">
      <template #content>
        <h1 class="text-2xl mb-4 text-center">Physical Fitness Test App</h1>
        <h2 class="text-lg text-center mb-6">Sign In</h2>

        <div class="flex flex-column gap-2 my-3">
          <label for="email">Email</label>
          <InputText
            id="email"
            v-model="emailInput"
            placeholder="example@email.com"
          />
        </div>

        <div class="flex flex-column gap-2 my-3">
          <label for="password">Password</label>
          <Password
            id="password"
            v-model="passwordInput"
            placeholder="********"
            :feedback="false"
            toggle-mask
            input-class="w-full"
          />
        </div>

        <Message v-if="isSignInError" severity="error">
          Error signing in! Please try again.
        </Message>
        <Button
          label="Sign In"
          class="w-full mt-6"
          :loading="isSignInLoading"
          @click="handleSignIn"
          :disabled="isSignInLoading"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { mapDbEnumToRoleEnum } from "~/utils/roleEnumMapper";

const emailInput = ref<string>("");
const passwordInput = ref<string>("");

const userStore = useUserStore();
const { signIn, isSignInLoading, isSignInError } = useAuth();

definePageMeta({
  layout: "public",
});

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
