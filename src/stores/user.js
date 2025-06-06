import { defineStore } from "pinia";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { objectHelper } from "../helpers/object.helper";

// выпилить
const STATUS_ERROR = "error";
const STATUS_SUCCESS = "success";
const STATUS_LOADING = "loading";

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
      this.setStatus(STATUS_LOADING);
      try {
        await AuthService.getCsrf();
        await AuthService.login(user);

        this.setStatus(STATUS_SUCCESS);
        this.setIsAuthenticated(true);

        return await this.request();
      } catch (err) {
        this.setStatus(STATUS_ERROR);
        throw err;
      }
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
      // async request() { // было наименование
      // по сути me()
      try {
        this.setStatus(STATUS_LOADING);
        let me = await AuthService.me();

        this.setStatus(STATUS_SUCCESS);
        this.setUser(me.data.user);
        this.setIsAuthenticated(true);

        return me;
      } catch (err) {
        this.setStatus(STATUS_ERROR);
        this.setIsAuthenticated(false); // !
        // throw err; // !!
      }
    },

    setModuleAccess(access = true) {
      this.moduleAccess = access;
    },

    setUser(user) {
      this.user = user;
    },

    setIsAuthenticated(bool) {
      this.isAuthenticated = bool;
    },

    setStatus(STATUS) {
      this.status = STATUS;
    },
  },
});
