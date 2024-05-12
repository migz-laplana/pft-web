import { UserRole } from "~/types/common.types";

export const mapDbEnumToRoleEnum = (roleValue: string) => {
  let role = UserRole.STUDENT;
  if (roleValue === "TEACHER") {
    role = UserRole.TEACHER;
  }

  return role;
};
