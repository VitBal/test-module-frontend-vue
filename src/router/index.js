import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "base",
      redirect: () => {
        return { name: "home" };
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: { guest: true },
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/ErrorNotFound.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();

  if (!userStore.user.id) {
    await userStore.checkAuth();
  }

  if (to.name === "login" && userStore.isAuthenticated) {
    return { name: "home" };
  }

  if (!to.meta.guest && !userStore.isAuthenticated) {
    return { name: "login" };
  }
});

export default router;
