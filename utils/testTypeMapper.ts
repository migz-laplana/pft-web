import { TestType } from "~/types/common.types";

export const mapTestTypeToEnum = (testType: string): TestType => {
  if (testType === TestType.POST_TEST) return TestType.POST_TEST;
  return TestType.PRE_TEST;
};
