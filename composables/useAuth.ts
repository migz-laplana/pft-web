import { apiRoutes } from "~/constants/api";
import type { SignInPayload, SignInResponse } from "./useAuth.types";

export const useAuth = () => {
  const { $customFetch } = useNuxtApp();
  const isSignInLoading = ref<boolean>(false);
  const isSignInError = ref<boolean>(false);
  const isSignOutLoading = ref<boolean>(false);

  const signIn = async (payload: SignInPayload) => {
    isSignInLoading.value = true;
    isSignInError.value = false;

    try {
      return await $customFetch<SignInResponse>(apiRoutes.auth.login, {
        method: "POST",
        body: payload,
      });
    } catch (error) {
      isSignInError.value = true;
    } finally {
      isSignInLoading.value = false;
    }
  };

  const signOut = async () => {
    isSignOutLoading.value = true;

    try {
      await $customFetch(apiRoutes.auth.logout, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    } finally {
      isSignOutLoading.value = false;
    }
  };

  return {
    signIn,
    isSignInLoading,
    isSignInError,
    signOut,
    isSignOutLoading,
  };
};
