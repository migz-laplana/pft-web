import { defineStore } from "pinia";
import type { UserProfile } from "~/types/common.types";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<UserProfile>();

  function setUserData(user: UserProfile) {
    currentUser.value = user;
  }

  return { currentUser, setUserData };
});
