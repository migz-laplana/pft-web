export enum UserRole {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type UserProfile = {
  userId: string;
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

export type GetProfileResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}