import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    mainPageURL: "https://egird.ru", // вынести эту конкретику в env?
    redirectingToMainPage: false,
  }),

  actions: {
    redirectToMainPage() {
      this.redirectingToMainPage = true;
      document.location.replace(this.mainPageURL);
    },
  },
});
