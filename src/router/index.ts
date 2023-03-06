import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/file",
    component: () => import("../views/File/Index.vue"),
    children: [
      {
        path: "/file/upload",
        name: "FileUpload",
        component: () => import("../views/File/Upload.vue"),
      },
      {
        path: "/file/list",
        name: "FileList",
        component: () => import("../views/File/List.vue"),
      },
      {
        path: "/file/setting",
        name: "FileSetting",
        component: () => import("../views/File/Setting.vue"),
      },
    ],
  },
  {
    path: "/setting",
    name: "Settings",
    component: () => import("@/views/Setting.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
