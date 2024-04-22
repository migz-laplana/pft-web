<template>
  <div class="md:hidden absolute w-full border-2 bg-white h-full">
    <ul>
      <li v-for="link in links" class="hover:text-black">
        <ULink
          :to="link.to"
          class="block p-4 hover:text-black font-medium"
          active-class="bg-green-400 text-black"
          inactive-class=" text-gray-600 bg-gray-100 hover:bg-green-100"
          @click="hideMobileNav"
        >
          {{ link.label }}
        </ULink>
      </li>
    </ul>
    <div class="flex pt-6 justify-center">
      <UButton class="mx-4" color="gray" variant="outline" @click="signOut">
        Log out of app
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from "~/types/common.types";

defineProps({
  links: {
    type: Array as PropType<NavLink[]>,
    required: true,
  },
  signOut: {
    type: Function as PropType<() => void>,
    required: true,
  },
  hideMobileNav: {
    type: Function as PropType<() => void>,
    required: true,
  },
});
</script>
