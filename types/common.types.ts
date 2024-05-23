export enum UserRole {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum KindePermissions {
  TEACHER = "teacher",
  STUDENT = "student",
}

export type UserResponse = {
  userId: string;
  permissions: string[];
};

export type UserProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
};

export type KindeUser = {
  id: string;
  preferredEmail: string;
  firstName: string;
  lastName: string;
};

export type SchoolClass = {
  id: number;
  created_at: Date;
  className: string;
  classCode: string;
  teacherId: string;
};

export type GetClassesResponse = (SchoolClass & {
  teacherDetails: KindeUser;
  studentCount: number;
})[];

export type GetClassResponse = SchoolClass & {
  teacherDetails: KindeUser;
  studentCount: number;
  students: KindeUser[];
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
