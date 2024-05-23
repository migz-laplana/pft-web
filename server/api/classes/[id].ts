import { apiRoutes } from "~/constants/api";
import { GetClassesResponse } from "~/types/common.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const classId = getRouterParam(event, "id");

  try {
    const token = await event.context.kinde.getToken();
    const res = await $fetch<GetClassesResponse>(
      `${config.public.serviceBaseUrl}${apiRoutes.classes.index}/${classId}`,
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
