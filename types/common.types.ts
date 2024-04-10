export enum UserRole {
  TEACHER = "teacher",
  STUDENT = "student",
}

export type UserProfile = {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
};
