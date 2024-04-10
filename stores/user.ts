import { defineStore } from "pinia";
import type { UserProfile } from "~/types/common.types";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<UserProfile | null>();

  function setUserData(user: UserProfile | null) {
    currentUser.value = user;
  }

  return { currentUser, setUserData };
});
