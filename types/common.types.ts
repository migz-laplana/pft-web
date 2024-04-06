export enum USER_ROLE {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type CurrentUser = {
  role: USER_ROLE;
  firstName: string;
  lastName: string;
  email: string;
};
