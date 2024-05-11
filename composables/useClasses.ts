import { apiRoutes } from "~/constants/api";
import { useCustomFetch } from "./useCustomFetch";

export const useClasses = () => {
  const isCreateClassLoading = ref<boolean>(false);
  const { $customFetch } = useNuxtApp();

  const {
    data: classes,
    pending: isClassesLoading,
    error: isClassesError,
    refresh: getClasses,
  } = useCustomFetch<{ name: string }[]>(apiRoutes.classes);

  const createClass = async (className: string) => {
    isCreateClassLoading.value = true;

    try {
      await $customFetch(apiRoutes.classes, {
        method: "POST",
        body: { name: className },
      });
    } catch (error) {
      throw error;
    } finally {
      isCreateClassLoading.value = false;
    }
  };

  return {
    classes,
    getClasses,
    isClassesLoading,
    isClassesError,
    createClass,
    isCreateClassLoading,
  };
};
