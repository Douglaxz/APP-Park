export const routes = [
  {
    path: "/park",
    name: "parklList",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/park/:id",
    name: "parkDetail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/park/:id/edit",
    name: "parkEdit",
    component: () => import("../views/Edit.vue"),
  },
  {
    path: "/park/add",
    name: "parkAdd",
    component: () => import("../views/Add.vue"),
  },
];
