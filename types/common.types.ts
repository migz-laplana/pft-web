export enum UserRole {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type UserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
};

export type UserProfile = UserResponse & {
  role: UserRole;
};

export type SchoolClass = {
  _id: string;
  name: string;
  classCode: string;
  teacher: UserResponse;
  students: UserResponse[];
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
};
