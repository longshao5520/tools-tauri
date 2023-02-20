import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/Setting.vue"),
  },
  {
    path: "/file",
    component: () => import("../views/File/Index.vue"),
    children: [
      {
        path: "upload",
        name: "Upload",
        component: () => import("../views/File/Upload.vue"),
      },
      {
        path: "list",
        name: "List",
        component: () => import("../views/File/List.vue"),
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("../views/File/Setting.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
