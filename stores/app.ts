import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const initialRoutePath = ref<string>();

  function setInitialRoutePath(path: string) {
    initialRoutePath.value = path;
  }

  return { initialRoutePath, setInitialRoutePath };
});
