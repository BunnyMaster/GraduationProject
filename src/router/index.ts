import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入
import routes from "@/router/router";
import { ElLoading } from "element-plus";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), //默认
  // history: createWebHashHistory(process.env.BASE_URL), //修改后
  routes,
});

const loadingInstance = ElLoading.service({
  text: "加载中......",
  background: "#A0CFFF27",
});
// 1.加载进度条：
router.beforeEach((to, from, next) => {
  // console.log(to);// 去往
  NProgress.start();
  loadingInstance;
  next();
});
// 2.页面加载完成关闭进度条：
router.afterEach((to, from) => {
  NProgress.done();
  loadingInstance.close();
});
export default router;
