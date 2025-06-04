import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "base",
      component: () => import("@/views/Home.vue"), // если ты аутентифицирован, то на home, если ты  нет, то на login
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/Login.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  // if (to.name === "login") {
  //   // не вызывать authStore.checkAuth(), когда мы на /login
  //   return;
  // }
  const authStore = useAuthStore();
  const userStore = useUserStore();
  console.log(userStore.user);

  if (!userStore.user.id) {
    console.log("нету");

    await authStore.checkAuth();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login" };
  }
});

export default router;
