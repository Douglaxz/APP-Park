export const routes = [
  {
    path: "/brand",
    name: "brandList",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/brand/:id",
    name: "brandDetail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/brand/:id/edit",
    name: "brandEdit",
    component: () => import("../views/Edit.vue"),
  },
  {
  path: "/brand/add",
    name: "brandAdd",
    component: () => import("../views/Add.vue"),
  },
];