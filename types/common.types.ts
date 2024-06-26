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

export enum TestType {
  PRE_TEST = "pre-test",
  POST_TEST = "post-test",
}

export type FitnessTestAnswers = {
  zipperTestPoints?: number;
  weight?: number;
  height?: number;
  sitAndReachDistanceCm?: number;
  pulseBeatsTenSec?: number;
  pushupsCount?: number;
  plankHoldDuration?: string;
  fortyMeterSprintDuration?: string;
  longJumpDistCm?: number;
  hexTestFirstRev?: string;
  hexTestSecondRev?: string;
  dropTestFirstRead?: number;
  dropTestSecondRead?: number;
  dropTestThirdRead?: number;
  jugglingHits?: number;
  balanceLeft?: string;
  balanceRight?: string;
};

export type FitnessTest = FitnessTestAnswers & {
  id: number;
  testType: TestType;
};

export enum ZipperTestChoice {
  NO_TOUCH = "Did not touch fingertips",
  TOUCHED = "Just touched fingertips",
  UP_TO_2 = "Fingers overlapped: 1-2 cm",
  UP_TO_4 = "Fingers overlapped: 3-4 cm",
  UP_TO_7 = "Fingers overlapped: 5-7 cm",
  AT_LEAST_8 = "Fingers overlapped: 8+ cm",
}

export type ZipperChoice = {
  name: ZipperTestChoice,
  points: number
}
