import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";
import router from "@/router/index";

const MSG_OBJ_NOT_FIND = "Объект не найден";
const MSG_SERVER_ERROR = "Произошла внутренняя ошибка сервера";

export const actionsOnError = {
  301: () => useAppStore().setVersionMismatch(),
  401: () => useUserStore().logout(),
  403: () => useAppStore().setAccessDenied(),
  404: () => useAppStore().showErrorBar(MSG_OBJ_NOT_FIND),
  409: (error) => useAppStore().showErrorBar(error.response.data.message),
  419: () => location.reload(),
  422: (error) => useAppStore().showErrorBar(error.response.data.message),
  423: () => {
    useUserStore().setModuleAccess(false);
    router.push("/locked");
  },
  500: () => useAppStore().showErrorBar(MSG_SERVER_ERROR),
  503: () => {
    useAppStore().setMaintenanceMode(true);
    router.push("/locked");
  },
};
