import { defineStore } from "pinia";
import { AuthService } from "../services/auth.service";
import { objectHelper } from "../helpers/object.helper";

export const useUserStore = defineStore("user", {
  state: () => ({
    status: "",
    user: {},
    moduleAccess: true,
  }),

  getters: {
    isAuthenticated: (state) =>
      Object.keys(state.user).length > 0,
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

        return await this.request();
      } catch (err) {}
    },

    async logout(state = true) {
      try {
        if(state) await AuthService.logout();
        this.setUser({});
      } catch (err) {
        throw err;
      }
    },

    async getUser() {
      try {
        let me = await AuthService.me();
        this.setUser(me.data.user);
        return me;
      } catch (err) {
        this.setUser({});
      }
    },

    setModuleAccess(access = true) {
      this.moduleAccess = access;
    },

    setUser(user) {
      this.user = user;
    },
  },
});
