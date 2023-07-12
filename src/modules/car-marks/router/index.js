export const routes = [
  {
    path: "/carMarks",
    name: "carMarksList",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/carMarks/:id",
    name: "carMarksDetail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/carMarks/:id/edit",
    name: "carMarksEdit",
    component: () => import("../views/Edit.vue"),
  },
  {
  path: "/carMarks/add",
    name: "carMarksAdd",
    component: () => import("../views/Add.vue"),
  },
];