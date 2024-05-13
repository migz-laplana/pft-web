<template>
  <div>
    <Sidebar v-model:visible="showSidebar" header="PFT" position="right">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">
          <div
            class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0"
          >
            <span class="inline-flex align-items-center gap-2">
              <span class="font-semibold text-2xl text-primary">PFT</span>
            </span>
            <span>
              <Button
                type="button"
                @click="closeCallback"
                icon="pi pi-times"
                outlined
                class="h-2rem w-2rem"
              ></Button>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-3 m-0 overflow-hidden">
              <li v-for="link in links">
                <NuxtLink
                  :to="link.to"
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 transition-duration-150 transition-colors no-underline"
                  :class="{
                    'bg-primary-500 text-white': activeLink === link.to,
                  }"
                >
                  <i class="mr-2" :class="link.icon"></i>
                  <span class="font-medium">{{ link.label }}</span>
                </NuxtLink>
              </li>

              <li>
                <div
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 transition-duration-150 transition-colors"
                  @click="signOut()"
                >
                  <i class="pi pi-sign-out mr-2"></i>
                  <span class="font-medium">Sign out</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
            <a
              v-ripple
              class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <Avatar icon="pi pi-user" shape="circle" />
              <span class="font-bold">
                {{ userStore.currentUser?.firstName }}
                {{ userStore.currentUser?.lastName }}
              </span>
            </a>
          </div>
        </div>
      </template>
    </Sidebar>
    <Button icon="pi pi-bars" @click="openSidebar" />
  </div>
</template>

<script lang="ts" setup>
import type { NavLink } from "~/types/common.types";

defineProps({
  links: {
    type: Array as PropType<NavLink[]>,
    required: true,
  },
  signOut: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
  activeLink: {
    type: String,
    required: true,
  },
});

const showSidebar = ref<boolean>(false);
const userStore = useUserStore();

const openSidebar = () => {
  showSidebar.value = true;
};
</script>

<style></style>
