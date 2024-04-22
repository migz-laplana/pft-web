<template>
  <div>
    <div class="h-16 border-2">
      <UContainer class="h-full">
        <div class="hidden md:flex items-center h-full justify-between">
          <p
            class="text-xl cursor-pointer whitespace-nowrap"
            @click="navigateTo('/')"
          >
            Physical Fitness Test App
          </p>
          <UHorizontalNavigation class="ml-8" :links="links" />
          <p class="mr-4 text-nowrap">
            {{
              `${userStore.currentUser?.firstName} ${userStore.currentUser?.lastName}`
            }}
          </p>
          <UButton color="gray" variant="outline" @click="signOut">
            Log out
          </UButton>
        </div>

        <div class="flex md:hidden items-center h-full justify-between">
          <p
            class="text-xl cursor-pointer whitespace-nowrap"
            @click="navigateTo('/')"
          >
            Physical Fitness Test App
          </p>

          <UButton
            @click="toggleMobileNav"
            :icon="
              showMobileNav
                ? 'i-heroicons-x-mark-20-solid'
                : 'i-heroicons-bars-4-20-solid'
            "
            square
            size="md"
            :color="showMobileNav ? 'black' : 'primary'"
            :variant="showMobileNav ? 'outline' : 'solid'"
          />
        </div>
      </UContainer>
    </div>
    <MobileNav
      v-if="showMobileNav"
      :links="links"
      :sign-out="signOut"
      :hide-mobile-nav="toggleMobileNav"
    />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const supabase = useSupabaseClient();
const toast = useToast();
const showMobileNav = ref<boolean>(false);

const links = [
  { label: "Home", to: "/", icon: "i-heroicons-home-solid" },
  { label: "Classes", to: "/classes", icon: "i-heroicons-user-group-16-solid" },
];

const toggleMobileNav = () => {
  showMobileNav.value = !showMobileNav.value;
};

const showLogoutError = () => {
  toast.add({ title: "Failed to log out." });
};

const signOut = async () => {
  showMobileNav.value = false;
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
