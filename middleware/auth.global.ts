export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  const publicRoutes = ["/check", "/login"];

  if (userStore.currentUser || publicRoutes.includes(to.path) || !to.name) {
    return;
  }

  return navigateTo({
    path: "/check",
    query: {
      dest: to.path,
    },
  });
});
