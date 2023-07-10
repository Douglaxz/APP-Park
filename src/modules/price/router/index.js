export const routes = [
  {
    path: "/price",
    name: "priceList",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/price/:id",
    name: "priceDetail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/price/:id/edit",
    name: "priceEdit",
    component: () => import("../views/Edit.vue"),
  },
  {
    path: "/price/add",
    name: "priceAdd",
    component: () => import("../views/Add.vue"),
  },
];
