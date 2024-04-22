import type { UserProfile } from "~/types/common.types";
import type { Database } from "~/types/supabase.types";
import { mapSupabaseEnumToRoleEnum } from "~/utils/roleEnumMapper";

export const useProfile = () => {
  const authenticatedUser = useSupabaseUser();
  const supabase = useSupabaseClient<Database>();

  const getProfileDetails = async (): Promise<UserProfile> => {
    const { data: userData } = await supabase
      .from("users")
      .select()
      .throwOnError();

    if (userData?.length) {
      return {
        firstName: userData[0].first_name,
        lastName: userData[0].last_name,
        role: mapSupabaseEnumToRoleEnum(userData[0].role),
        email: authenticatedUser.value?.email!,
        userId: userData[0].id
      };
    }

    throw new Error("no user found as student/teacher");
  };

  return { getProfileDetails };
};
