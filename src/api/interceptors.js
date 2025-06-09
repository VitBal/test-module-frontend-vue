import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";

export const actionsOnError = {
  301: () => appStore.setVersionMismatch(),
  401: () => useUserStore().logout(false),
  403: () => appStore.setAccessDenied(),
  404: () => appStore.showErrorBar("Объект не найден", "negative"),
  409: () => appStore.showErrorBar(error.response.data.message, "warning"),
  419: () => location.reload(),
  422: (error) =>
    appStore.showErrorBar(error.response.data.message, "negative"),
  423: () => {
    // редирект !!
    useUserStore().setModuleAccess(false);
    // router.push("/locked");
  },
  500: () =>
    appStore.showErrorBar("Произошла внутренняя ошибка сервера", "negative"),
  503: () => appStore.setMaintenanceMode(true), // редирект !!
};
