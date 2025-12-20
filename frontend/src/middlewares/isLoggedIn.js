import { useAuthStore } from "@/stores";

export const isLoggedIn = ({ to }) => {
  const authStore = useAuthStore();

  return authStore.isAuthenticated
    ? true
    : { path: "/login", query: { redirect: to.fullPath } };
};
