import { useAppStore } from "~/stores/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const appStore = useAppStore();

  const publicRoutes = ["/check", "/login"];

  if (userStore.currentUser || publicRoutes.includes(to.path) || !to.name) return;
  appStore.setInitialRoutePath(from.path);
  return navigateTo("/check");
});
