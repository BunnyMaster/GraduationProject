import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入
import routes from "@/router/router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 1.加载进度条：
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
// 2.页面加载完成关闭进度条：
router.afterEach((to, from) => {
  NProgress.done();
});
export default router;
