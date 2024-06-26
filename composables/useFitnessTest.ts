import { apiRoutes } from "~/constants/api";
import { useCustomFetch } from "./useCustomFetch";
import type {
  FitnessTest,
  FitnessTestAnswers,
  GetClassesResponse,
  TestType,
} from "~/types/common.types";
import { GetFitnessTestErrorName } from "./useFitnessTest.types";

export const useFitnessTest = () => {
  const { $customFetch } = useNuxtApp();

  const submitTestLoading = ref<boolean>(false);
  const submitTestError = ref<boolean>(false);
  const updateTestLoading = ref<boolean>(false);
  const updateTestError = ref<boolean>(false);

  const getFitnessTest = async (
    studentId: string,
    classId: number,
    testType: TestType
  ) => {
    try {
      const data = await $customFetch<FitnessTest>(
        `/api${apiRoutes.fitnessTestResult.index}`,
        {
          query: {
            studentId,
            classId,
            testType,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.data.data.error === GetFitnessTestErrorName.NoTestFound) {
        return null;
      }
      throw error;
    }
  };

  const createFitnessTest = async (
    studentId: string,
    classId: number,
    testType: TestType
  ) => {
    try {
      const data = await $customFetch<FitnessTest>(
        `/api${apiRoutes.fitnessTestResult.index}`,
        {
          method: "POST",
          body: {
            studentId,
            classId,
            testType,
          },
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getOrCreateFitnessTest = async (
    studentId: string,
    classId: number,
    testType: TestType
  ) => {
    try {
      const fitnessTest = await getFitnessTest(studentId, classId, testType);

      if (fitnessTest) return fitnessTest;

      return await createFitnessTest(studentId, classId, testType);
    } catch (error: any) {
      throw error;
    }
  };

  const updateFitnessTestAnswers = async (
    fitnessTestId: number,
    answers: FitnessTestAnswers
  ) => {
    updateTestLoading.value = true;
    updateTestError.value = false;
    try {
      const payload = Object.fromEntries(
        Object.entries(answers).filter(([_, value]) => !!value)
      );

      const data = await $customFetch<FitnessTest>(
        `/api${apiRoutes.fitnessTestResult.index}/${fitnessTestId}`,
        {
          method: "PATCH",
          body: payload,
        }
      );
      return data;
    } catch (error) {
      updateTestError.value = true;
    } finally {
      updateTestLoading.value = false;
    }
  };

  const submitFitnessTest = async (fitnessTestId: number) => {
    submitTestLoading.value = true;
    submitTestError.value = false;
    try {
      await $customFetch(
        `/api${apiRoutes.fitnessTestResult.index}/${fitnessTestId}/submit`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      submitTestError.value = true;
    } finally {
      submitTestLoading.value = false;
    }
  };

  return {
    getOrCreateFitnessTest,
    submitFitnessTest,
    submitTestLoading,
    submitTestError,
    updateFitnessTestAnswers,
    updateTestLoading,
    updateTestError,
  };
};
