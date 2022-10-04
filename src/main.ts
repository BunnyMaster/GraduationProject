import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(store).use(router);
//默认样式
import "@/assets/style/rest.less";
//饿了吗
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);
//模拟JS
import "@/MockJs/MockJsServer.js";
// 引入echarts
import * as echarts from "echarts";
//绑定全局变量
app.config.globalProperties.$echarts = echarts;
// app.use(echarts);
app.mount("#app");
