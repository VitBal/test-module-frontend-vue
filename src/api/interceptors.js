import { useUserStore } from "@/stores/user";

export const actionsOnError = {
  301: () => console.log("301"), //appStore.setVersionMismatch(),
  401: () => useUserStore().logout(false),
  403: () => console.log("403"), //appStore.setAccessDenied(),
  404: () => console.log("404"), //appStore.showErrorBar('Объект не найден', 'negative'),
  409: () => console.log("409"), //appStore.showErrorBar(error.response.data.message, 'warning'),
  419: () => location.reload(),
  // 422: (error) => appStore.showErrorBar(error.response.data.message, 'negative'),
  // 423: () => userStore.setModuleAccess(false),
  500: () => console.log("500"), //appStore.showErrorBar('Произошла внутренняя ошибка сервера', 'negative'),
  // 503: () => appStore.setMaintenanceMode(true),
};
