import { apiRoutes } from "~/constants/api";
import { FitnessTest } from "~/types/common.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const token = await event.context.kinde.getToken();
    const body = await readBody(event);

    const res = await $fetch<FitnessTest>(
      `${config.public.serviceBaseUrl}${apiRoutes.fitnessTestResult.index}`,
      {
        method: "POST",
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
