export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const user = useSupabaseUser();

  const publicRoutes = ["/check", "/login"];

  if (userStore.currentUser || publicRoutes.includes(to.path) || !to.name) {
    if (user.value && to.path === "/login") {
      return navigateTo("/");
    } else {
      return;
    }
  }

  return navigateTo({
    path: "/check",
    query: {
      dest: to.path,
    },
  });
});
