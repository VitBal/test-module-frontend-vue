import {useAuthStore} from "@/stores/auth.js";

export const actionsOnError = {
    401: () => useAuthStore().logout(false),
}

