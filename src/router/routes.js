const routes = [
  {
    path: "/:catchAll(.*)*",
    component: () => import("../views/ErrorNotFound.vue"),
  },
];

export default routes;
