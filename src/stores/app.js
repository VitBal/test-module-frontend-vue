import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    maintenanceMode: false,
    versionMismatch: false,
    notFound: false,
    accessDenied: false,
    tooltip: {
      //TODO:: возможно выпилить
      show: false,
      x: 0,
      y: 0,
      text: null,
      timerId: null,
      enabled: true,
    },
    mainPageURL: "https://egird.ru",
    currentPageURL: process.env.HOST,
    redirectingToMainPage: false,
    redirectToMainPageAfterLogout: !process.env.DEBUGGING,
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

    showTooltip(params) {
      this.tooltipClearTimeout();

      if (params.show) {
        this.tooltipCalculate(params);

        this.tooltipSetTimeout(
          setTimeout(() => this.tooltipShow(params.show), params.openDelay)
        );
      } else {
        this.tooltipSetTimeout(
          setTimeout(() => this.tooltipShow(params.show), params.closeDelay)
        );
      }
    },

    tooltipShow(show) {
      this.tooltip.show = show;
    },

    // показать Notify аналог Quasar
    showErrorBar(message, color = "") {
      console.log(`Notify: message ${message}, color ${color}`);
    },

    tooltipCalculate(params) {
      const c = params.event.target.getBoundingClientRect();

      this.tooltip.x = c.left + c.width / 2;
      this.tooltip.y = c.top;

      this.tooltip.text = params.text;
    },

    tooltipClearTimeout() {
      clearTimeout(this.tooltip.timerId);
    },

    tooltipSetTimeout(timerId) {
      this.tooltip.timerId = timerId;
    },
  },
});
