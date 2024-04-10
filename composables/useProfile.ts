import { UserRole, type UserProfile } from "~/types/common.types";
import type { Database } from "~/types/supabase.types";

export const useProfile = () => {
  const authenticatedUser = useSupabaseUser();
  const supabase = useSupabaseClient<Database>();

  const getProfileDetails = async (): Promise<UserProfile> => {
    const { data: teacherData } = await supabase
      .from("TEACHER")
      .select()
      .throwOnError();

    if (teacherData?.length) {
      return {
        firstName: teacherData[0].first_name,
        lastName: teacherData[0].last_name,
        role: UserRole.TEACHER,
        email: authenticatedUser.value?.email!,
      };
    }

    const { data: studentData } = await supabase
      .from("STUDENT")
      .select()
      .throwOnError();

    if (studentData?.length) {
      return {
        firstName: studentData[0].first_name,
        lastName: studentData[0].last_name,
        role: UserRole.STUDENT,
        email: authenticatedUser.value?.email!,
      };
    }

    throw new Error("no user found as student/teacher");
  };

  return { getProfileDetails };
};
