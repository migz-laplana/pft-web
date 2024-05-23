import { apiRoutes } from "~/constants/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const token = await event.context.kinde.getToken();
    const body = await readBody(event);
    const res = await $fetch(
      `${config.public.serviceBaseUrl}${apiRoutes.classes.join}`,
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
