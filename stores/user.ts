import { defineStore } from "pinia";
import type { CurrentUser } from "~/types/common.types";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<CurrentUser | null>();

  function setUserData(user: CurrentUser | null) {
    currentUser.value = user;
  }

  return { currentUser, setUserData };
});
