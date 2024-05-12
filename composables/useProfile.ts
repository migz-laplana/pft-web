import type { GetProfileResponse, UserProfile } from "~/types/common.types";
import { mapDbEnumToRoleEnum } from "~/utils/roleEnumMapper";
import { apiRoutes } from "~/constants/api";

export const useProfile = () => {
  const { $customFetch } = useNuxtApp();

  const getProfileDetails = async (): Promise<UserProfile> => {
    try {
      const { _id, email, firstName, lastName, role } =
        await $customFetch<GetProfileResponse>(apiRoutes.auth.profile);

      return {
        _id,
        email,
        firstName,
        lastName,
        role: mapDbEnumToRoleEnum(role),
      };
    } catch (error) {
      throw error;
    }
  };

  return { getProfileDetails };
};
