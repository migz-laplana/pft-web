import { apiRoutes } from "~/constants/api";
import { FitnessTest } from "~/types/common.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const fitnessTestId = getRouterParam(event, "id");

  try {
    const token = await event.context.kinde.getToken();

    const res = await $fetch<FitnessTest>(
      `${config.public.serviceBaseUrl}${apiRoutes.fitnessTestResult.index}/${fitnessTestId}/submit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
});
