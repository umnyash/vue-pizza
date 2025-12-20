import { defineStore } from "pinia";
import resources from "@/services/resources";
import JwtService from "@/services/jwt/jwt.service";
import { useProfileStore } from "@/stores/profile";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated(state) {
      return Boolean(state.user);
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },

    async login(credentials) {
      const response = await resources.auth.login(credentials);

      if (response.__state === "success") {
        JwtService.saveToken(response.data.token);
        return "success";
      } else {
        return response.data.message;
      }
    },

    async logout() {
      await resources.auth.logout();
      JwtService.removeToken();
      resources.auth.setAuthHeader("");
      this.user = null;
    },

    async whoAmI() {
      resources.auth.setAuthHeader(JwtService.getToken());
      const profileStore = useProfileStore();

      const res1 = await resources.auth.whoAmI();

      if (res1.__state !== "success") {
        await this.logout();
        return;
      } else {
        this.setUser(res1.data);
      }

      const res2 = await resources.address.getAddresses();

      if (res2.__state !== "success") {
        await this.logout();
      } else {
        profileStore.setAddresses(res2.data);
      }

      const res3 = await resources.order.getOrders();

      if (res3.__state !== "success") {
        await this.logout();
      } else {
        profileStore.setOrders(res3.data);
      }
    },
  },
});
