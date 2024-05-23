import { apiRoutes } from "~/constants/api";
import { useCustomFetch } from "./useCustomFetch";
import type { GetClassesResponse } from "~/types/common.types";

export const useClasses = async () => {
  const isCreateClassLoading = ref<boolean>(false);
  const isJoinClassLoading = ref<boolean>(false);
  const { $customFetch } = useNuxtApp();

  const {
    data: classes,
    pending: isClassesLoading,
    error: isClassesError,
    refresh: getClasses,
  } = await useCustomFetch<GetClassesResponse>(
    `/api${apiRoutes.classes.index}`
  );

  const createClass = async (className: string) => {
    isCreateClassLoading.value = true;

    try {
      await $customFetch(`/api${apiRoutes.classes.create}`, {
        method: "POST",
        body: { name: className },
      });
    } catch (error) {
      throw error;
    } finally {
      isCreateClassLoading.value = false;
    }
  };

  const joinClass = async (classCode: string): Promise<void> => {
    isJoinClassLoading.value = true;

    try {
      await $customFetch(`/api${apiRoutes.classes.join}`, {
        method: "POST",
        body: { classCode },
      });
    } catch (error) {
      throw error;
    } finally {
      isJoinClassLoading.value = false;
    }
  };

  return {
    classes,
    getClasses,
    isClassesLoading,
    isClassesError,
    createClass,
    isCreateClassLoading,
    joinClass,
    isJoinClassLoading,
  };
};
