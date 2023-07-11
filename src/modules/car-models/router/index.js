export const routes = [
  {
    path: "/model",
    name: "modelList",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/model/:id",
    name: "modelDetail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/model/:id/edit",
    name: "modelEdit",
    component: () => import("../views/Edit.vue"),
  },
  {
    path: "/model/add",
    name: "modelAdd",
    component: () => import("../views/Add.vue"),
  },
];
