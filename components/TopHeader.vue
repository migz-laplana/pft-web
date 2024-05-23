<template>
  <div style="">
    <Card pt:body:class="px-0 py-2">
      <template #content>
        <Container>
          <div class="flex justify-content-between">
            <div class="flex">
              <p class="text-lg font-semibold my-auto mr-4">
                Physical Fitness Test
              </p>
              <div class="my-auto hidden md:block">
                <NuxtLink v-for="link in links" :to="link.to" class="mx-1">
                  <Button
                    :icon="link.icon"
                    :label="link.label"
                    severity="secondary"
                    :text="activeLink !== link.to"
                  />
                </NuxtLink>
              </div>
            </div>
            <div>
              <div class="my-auto md:hidden py-2">
                <MobileNav
                  :sign-out="handleSignOut"
                  :links="links"
                  :active-link="activeLink ?? '/'"
                />
              </div>
              <div class="hidden md:flex">
                <div class="my-auto">
                  <Button
                    text
                    severity="secondary"
                    icon="pi pi-cog"
                    icon-pos="right"
                    @click="toggle"
                    class="p-2"
                    :label="`${user?.given_name} ${user?.family_name}`"
                    pt:label:class="mr-2 my-auto"
                    pt:icon:class="my-auto"
                  >
                  </Button>
                  <OverlayPanel ref="op" pt:content:class="p-0">
                    <Menu :model="avatarMenuItems" pt:menu:class="p-2">
                      <template #start>
                        <div
                          class="relative overflow-hidden w-full flex align-items-center p-2 text-color border-noround"
                        >
                          <Avatar
                            icon="pi pi-user"
                            class="mr-2"
                            shape="circle"
                          />
                          <span class="inline-flex flex-column">
                            <span class="font-bold">
                              {{ user?.given_name }}
                              {{ user?.family_name }}
                            </span>
                            <span class="text-sm mt-1">{{
                              userStore.currentUser?.role
                            }}</span>
                          </span>
                        </div>
                      </template>

                      <template #submenuheader="{ item }">
                        <span class="text-primary font-bold pb-1">
                          {{ item.label }}
                        </span>
                      </template>

                      <template #item="{ item }">
                        <a
                          class="flex align-items-center p-2 p-link"
                          @click="item.onClick"
                        >
                          <span :class="item.icon" />
                          <span class="ml-2">{{ item.label }}</span>
                        </a>
                      </template>
                    </Menu>
                  </OverlayPanel>
                </div>
              </div>
            </div>
          </div>
          <Toast />
        </Container>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import type { NavLink } from "~/types/common.types";

const links: NavLink[] = [
  {
    label: "Home",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "Classes",
    icon: "pi pi-users",
    to: "/classes",
  },
];

const route = useRoute();
const toast = useToast();
const userStore = useUserStore();
const { user } = useAuth();

const activeLink = computed(() => {
  if (route.path === "/") return "/";
  return links
    .filter((link) => link.to !== "/")
    .find((link) => route.path.includes(link.to))?.to;
});

const handleSignOut = async () => {
  try {
    userStore.setUserData(null);
    await navigateTo("/api/logout", { external: true });
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Failed to sign out",
      detail: "Sign out failed, please try again.",
      life: 5000,
    });
  }
};

const op = ref();
const toggle = (event: Event) => {
  op.value.toggle(event);
};

const avatarMenuItems = ref([
  { separator: true },
  {
    label: "Profile",
    items: [
      { label: "Sign out", icon: "pi pi-sign-out", onClick: handleSignOut },
    ],
  },
]);
</script>
