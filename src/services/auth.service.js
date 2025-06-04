import { api } from "../api";

export const AuthService = {
  getCsrf() {
    return api.get("/sanctum/csrf-cookie");
  },

  login(data) {
    return api.post("/api/auth/login", data);
  },

  logout() {
    return api.post("/api/auth/logout");
  },

  me() {
    return api.get("/api/auth/me");
  },

  // не проверено
  otherModules() {
    return api.get("auth/other-modules");
    // return api.get("api/auth/other-modules");
  },
};
