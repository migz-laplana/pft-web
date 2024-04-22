import { UserRole } from "~/types/common.types";

export const mapSupabaseEnumToRoleEnum = (roleValue: string) => {
  let role = UserRole.STUDENT;
  if ((roleValue = "teacher")) {
    role = UserRole.TEACHER;
  }

  return role;
};
