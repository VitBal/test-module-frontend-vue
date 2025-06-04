import { defineStore } from "pinia";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { objectHelper } from "../helpers/object.helper";

export const STATUS_ERROR = "error";
export const STATUS_SUCCESS = "success";
export const STATUS_LOADING = "loading";

export const useUserStore = defineStore("user", {
  state: () => ({
    status: "",
    user: {},
    moduleAccess: true, // почему по умолчанию доступ есть? логично чтобы не было
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
    async request() {
      try {
        this.setRequest();
        let resp = await AuthService.me();
        this.success(resp.data.user);

        return resp;
      } catch (e) {
        this.error();
        throw e;
      }
    },

    async update(user) {
      try {
        this.setRequest();
        let resp = await UserService.update(user.id, user);
        this.success(resp.data.user);

        return resp;
      } catch (e) {
        throw e;
      }
    },

    setModuleAccess(access = true) {
      this.moduleAccess = access;
    },

    setRequest() {
      this.status = STATUS_LOADING;
    },

    success(user) {
      this.status = STATUS_SUCCESS;
      this.user = user;
    },

    error() {
      this.status = STATUS_ERROR;
    },

    logout() {
      this.user = {};
    },
  },
});
