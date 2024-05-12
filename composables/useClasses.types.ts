import type { SchoolClass } from "~/types/common.types";

export enum JoinClassErrorName {
  NoClassFound = "NO_CLASS_FOUND_ERROR",
  AlreadyEnrolled = "ALREADY_ENROLLED_ERROR",
}

export enum JoinClassErrorMessage {
  NoClassFound = "No class found for given class code.",
  AlreadyEnrolled = "You are already enrolled in this class.",
  Default = "Error joining class. Please try again or use another code.",
}

export type JoinClassResponse = {
  message: string;
  class: SchoolClass;
};
