import { apiRoutes } from "~/constants/api";
import { FitnessTest } from "~/types/common.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const token = await event.context.kinde.getToken();
    const query = getQuery(event);

    const res = await $fetch<FitnessTest>(
      `${config.public.serviceBaseUrl}${apiRoutes.fitnessTestResult.index}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        query,
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
});
