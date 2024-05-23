import { UserRole } from "~/types/common.types";

export const mapDbEnumToRoleEnum = (roleValue: string) => {
  let role = UserRole.STUDENT;
  if (roleValue === "TEACHER") {
    role = UserRole.TEACHER;
  }

  return role;
};

export const getRoleFromKindePermissions = (permissions: string[]) => {
  const roles = ["student", "teacher"];
  const foundRole = permissions.find((permission) =>
    roles.includes(permission)
  );

  if (foundRole === "teacher") {
    return UserRole.TEACHER;
  }

  return UserRole.STUDENT;
};
