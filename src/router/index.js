import {createRouter, createWebHashHistory} from "vue-router";
import { useUserStore } from "@/stores/user";
import { useAppStore } from "@/stores/app";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/MainLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/About.vue"),
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginPage.vue"),
      meta: { guest: true },
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/locked",
      name: "locked",
      component: () => import("@/views/LockedPage.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/ErrorNotFound.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const appStore = useAppStore();

    if (!userStore.isAuthenticated && to.name !=='locked') {
        await userStore.getUser();
    }

    if (to.name === 'locked' && (userStore.moduleAccess && !appStore.maintenanceMode)) {
        return userStore.isAuthenticated ? {name: 'home'} : {name: 'login'};
    }

    if (to.name !== 'locked' && (!userStore.moduleAccess || appStore.maintenanceMode)) {
        return {name: 'locked'}
    }

    if (to.name === "login" && userStore.isAuthenticated) {
        return {name: "home"}
    }

    if (!to.meta.guest && !userStore.isAuthenticated) {
        return {name: "login"}
    }
});

export default router;
