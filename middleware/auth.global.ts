export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  const publicRoutes = ["/check", "/logout", "/api/login", "/api/logout"];

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
