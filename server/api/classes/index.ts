import { apiRoutes } from "~/constants/api";
import { GetClassesResponse } from "~/types/common.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const token = await event.context.kinde.getToken();
    const res = await $fetch<GetClassesResponse>(
      `${config.public.serviceBaseUrl}${apiRoutes.classes.index}`,
      {
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
