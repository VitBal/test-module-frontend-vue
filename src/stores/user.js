import { defineStore } from "pinia";
import { AuthService } from "../services/auth.service"; // ?
import { UserService } from "../services/user.service";
import { objectHelper } from "../helpers/object.helper";

export const STATUS_ERROR = "error";
export const STATUS_SUCCESS = "success";
export const STATUS_LOADING = "loading";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    status: "", // был status auth и есть status user
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
    // из auth | async request(user) из authStore
    // !! переименовать в auth
    async login(user) {
      this.setRequestAuth();
      // const userStore = useUserStore();
      try {
        await AuthService.getCsrf();
        await AuthService.login(user);

        this.setSuccessAuth();
        // return await userStore.request();
        return await this.request();
      } catch (err) {
        this.setErrorAuth();
        throw err;
      }
    },

    // из auth
    async checkAuth() {
      // const userStore = useUserStore();
      try {
        const me = await this.request(); // метод надо как то модифицировать
        // его задача получить user
        // а он там пачку вещей делает
        if (me?.data?.user) {
          this.setSuccessAuth();
        }
      } catch (err) {
        this.setLogoutAuth();
        // throw err;
      }
    },

    // из auth
    async logoutAuth(isServer) {
      try {
        if (isServer) await AuthService.logout();
        this.setLogoutAuth();
      } catch (err) {
        this.setLogoutAuth();
        // throw err;
      }
    },

    async request() {
      // по сути me()
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

    // store auth
    setRequestAuth() {
      this.status = "loading"; // может перебить статус user
    },

    setLogoutAuth() {
      this.isAuthenticated = false;
    },

    setSuccessAuth() {
      this.status = "success"; // может перебить статус user
      this.isAuthenticated = true;
    },

    setErrorAuth() {
      this.status = "error"; // может перебить статус user
    },
  },
});
