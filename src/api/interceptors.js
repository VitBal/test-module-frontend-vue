import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";

export const actionsOnError = {
  301: () => useAppStore().setVersionMismatch(),
  401: () => useUserStore().logout(),
  403: () => useAppStore().setAccessDenied(),
  404: () => useAppStore().showErrorBar("Объект не найден"),
  409: (error) => useAppStore().showErrorBar(error.response.data.message),
  419: () => location.reload(),
  422: (error) =>
    useAppStore().showErrorBar(error.response.data.message),
  423: () => {
    // редирект !!
    useUserStore().setModuleAccess(false);
    // router.push("/locked");
  },
  500: () =>
    useAppStore().showErrorBar("Произошла внутренняя ошибка сервера"),
  503: () => useAppStore().setMaintenanceMode(true), // редирект !!
};
