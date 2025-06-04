import { defineStore } from "pinia";
import { AuthService } from "../services/auth.service";
import { useUserStore } from "./user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    // auth заменяем на isAuthenticated
    // auth: false, // был true, по умолчанию должно быть false по логике, смысл?
    status: "", // а чего по умолчанию статус пустой?
  }),

  actions: {
    async request(user) {
      this.setRequest();
      const userStore = useUserStore();

      try {
        await AuthService.getCsrf();
        await AuthService.login(user);

        this.setSuccess();
        return await userStore.request();
      } catch (err) {
        this.setError();
        throw err;
      }
    },

    async logout(isServer) {
      try {
        if (isServer) await AuthService.logout();
        this.setLogout();
      } catch (err) {
        this.setLogout();
        // throw err;
      }
    },

    async checkAuth() {
      const userStore = useUserStore();
      try {
        const me = await userStore.request(); // метод надо как то модифицировать
        // его задача получить user
        // а он там пачку вещей делает
        if (me?.data?.user) {
          this.setSuccess();
        }
      } catch (err) {
        this.setLogout();
        // throw err;
      }
    },

    setRequest() {
      this.status = "loading";
    },

    setLogout() {
      this.isAuthenticated = false;
    },

    setSuccess() {
      this.status = "success";
      this.isAuthenticated = true;
    },

    setError() {
      this.status = "error";
    },
  },
});
