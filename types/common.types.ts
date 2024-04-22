export enum UserRole {
  TEACHER = "teacher",
  STUDENT = "student",
}

export type UserProfile = {
  userId: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
};

export type NavLink = {
  label: string;
  to: string;
  icon: string;
};
