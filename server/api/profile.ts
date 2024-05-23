import { apiRoutes } from "~/constants/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  try {
    const token = await event.context.kinde.getToken();
    const res = await $fetch(
      `${config.public.serviceBaseUrl}${apiRoutes.auth.profile}`,
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
