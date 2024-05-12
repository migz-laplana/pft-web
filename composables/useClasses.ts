import { apiRoutes } from "~/constants/api";
import { useCustomFetch } from "./useCustomFetch";
import type { SchoolClass } from "~/types/common.types";
import type { JoinClassResponse } from "./useClasses.types";

export const useClasses = async () => {
  const isCreateClassLoading = ref<boolean>(false);
  const isJoinClassLoading = ref<boolean>(false);
  const { $customFetch } = useNuxtApp();

  const {
    data: classes,
    pending: isClassesLoading,
    error: isClassesError,
    refresh: getClasses,
  } = await useCustomFetch<SchoolClass[]>(apiRoutes.classes.index);

  const createClass = async (className: string) => {
    isCreateClassLoading.value = true;

    try {
      await $customFetch(apiRoutes.classes.create, {
        method: "POST",
        body: { name: className },
      });
    } catch (error) {
      throw error;
    } finally {
      isCreateClassLoading.value = false;
    }
  };

  const joinClass = async (classCode: string): Promise<JoinClassResponse> => {
    isJoinClassLoading.value = true;

    try {
      return await $customFetch<JoinClassResponse>(apiRoutes.classes.join, {
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
