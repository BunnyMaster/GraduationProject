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
  },
  { path: "/system", name: "system", component: () => import("@/views/System.vue") },
  { path: "/login", name: "login", component: () => import("@/Page/Login/index.vue") },
];
export default routes;
