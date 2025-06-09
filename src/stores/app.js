import { defineStore } from "pinia";

const ENV_URL = import.meta.env.VITE_API_URL;
const ENV_HOST = import.meta.env.VITE_SERVER_HOST;
const ENV_DEBUGGING = import.meta.env.VITE_APP_DEBUGGING;

export const useAppStore = defineStore("app", {
  state: () => ({
    maintenanceMode: false,
    versionMismatch: false,
    accessDenied: false,
    mainPageURL: ENV_URL,
    redirectingToMainPage: false,
    redirectToMainPageAfterLogout: !ENV_DEBUGGING,
    errorBar: {
      show: false,
      message: null,
      color: "",
    },
  }),

  actions: {
    redirectToMainPage() {
      this.redirectingToMainPage = true;
      document.location.replace(this.mainPageURL);
    },

    setAccessDenied(access = true) {
      this.accessDenied = access;
    },

    reload() {
      document.location.reload();
    },

    setMaintenanceMode(mode) {
      this.maintenanceMode = mode;
    },

    setVersionMismatch(mismatch = true) {
      this.versionMismatch = mismatch;
    },

    setNotFound(state = true) {
      this.notFound = state;
    },

    // показать Notify (был Notify Quasar)
    showErrorBar(message, detail = '') {
      document.dispatchEvent(new CustomEvent('show-notify', {
        detail: { message, detail }
      }));
    },
  },
});
