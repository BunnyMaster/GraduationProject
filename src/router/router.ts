import { RouteRecordRaw } from "vue-router";
import homeChildren from "./Home/HomeChildren";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    redirect: "/home/main",
    component: () => import("@/Page/Home/index.vue"),
    children: homeChildren,
    meta: { isShow: true },
  },
  {
    path: "/system",
    name: "system",
    component: () => import("@/views/System.vue"),
    meta: { isShow: false, title: "系统运行" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/Page/Login/index.vue"),
    meta: { isShow: false },
  },
];

export default routes;
