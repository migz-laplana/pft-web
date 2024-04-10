<template>
  <div class="h-16 border-2">
    <UContainer class="h-full">
      <div class="flex items-center h-full justify-between">
        <p class="text-xl cursor-pointer" @click="navigateTo('/')">
          Physical Fitness Test App
        </p>
        <UButton color="gray" variant="outline" @click="signOut"
          >Logout</UButton
        >
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const supabase = useSupabaseClient();
const toast = useToast();

const showLogoutError = () => {
  toast.add({ title: "Failed to log out." });
};

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    userStore.setUserData(null);
    await navigateTo("/login");
  } catch (e) {
    showLogoutError();
  }
};
</script>
