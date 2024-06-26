import { apiRoutes } from "~/constants/api";
import { FitnessTest } from "~/types/common.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const fitnessTestId = getRouterParam(event, "id");

  try {
    const token = await event.context.kinde.getToken();
    const body = await readBody(event);
    
    const res = await $fetch<FitnessTest>(
      `${config.public.serviceBaseUrl}${apiRoutes.fitnessTestResult.index}/${fitnessTestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
});
