import { defineStore } from "pinia";
import { AuthService } from "../services/auth.service";
import { objectHelper } from "../helpers/object.helper";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false, // в геттер перенести
    status: "",
    user: {},
    moduleAccess: true,
  }),

  getters: {
    userId: (state) => state.user.id,
    profileId: (state) => (state.user.profile ? state.user.profile.id : null),
    isLoaded: (state) => !!state.user.name,
    modules: (state) => (state.user.modules ? state.user.modules : []),
    currentModule: (state) => state.user.current_module,
    sessionId: (state) => state.user.session_id,
    hasRole: (state) => (role) => state.user.roles.includes(role),
    hasPermission: (state) => (permission) =>
      state.user.permissions.includes(permission),
    can: (state) => (ability) => {
      let can = objectHelper.getDescendantProp(state.user.can, ability);

      if (typeof can !== "boolean")
        console.warn(`Ability "${ability}" not found or is not an Boolean.`);

      return can;
    },
  },

  actions: {
    async login(user) {
      try {
        await AuthService.getCsrf();
        await AuthService.login(user);

        this.setIsAuthenticated(true);

        return await this.request();
      } catch (err) {}
    },

    async logout(isServer) {
      try {
        if (isServer) await AuthService.logout();
        this.setIsAuthenticated(false);
      } catch (err) {
        this.setIsAuthenticated(false);
        throw err;
      }
    },

    async getUser() {
      try {
        let me = await AuthService.me();

        this.setUser(me.data.user);
        this.setIsAuthenticated(true);

        return me;
      } catch (err) {
        this.setIsAuthenticated(false); // !
      }
    },

    // !
    setModuleAccess(access = true) {
      this.moduleAccess = access;
    },

    setUser(user) {
      this.user = user;
    },

    setIsAuthenticated(bool) {
      this.isAuthenticated = bool;
    },
  },
});
