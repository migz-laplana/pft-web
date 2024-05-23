import type { UserProfile } from "~/types/common.types";

export const useProfile = () => {
  const { $customFetch } = useNuxtApp();
  const { user } = useAuth();

  const getProfileDetails = async (): Promise<UserProfile> => {
    try {
      const { id, permissions } = await $customFetch<{
        id: string;
        permissions: string[];
      }>("/api/profile");

      const undefinedString = "undefined";

      return {
        userId: id,
        firstName: user?.given_name ?? undefinedString,
        lastName: user?.family_name ?? undefinedString,
        email: "dummy@email.com",
        role: getRoleFromKindePermissions(permissions),
      };
    } catch (error) {
      throw error;
    }
  };

  return { getProfileDetails };
};
