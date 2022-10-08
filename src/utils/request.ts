import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

import { ElLoading } from "element-plus";

const request = axios.create({
  baseURL: "/api", //请求的基础路径
  timeout: 5000, //超时时间
});

const loadingInstance = ElLoading.service({
  text: "加载中......",
  background: "#A0CFFF8D",
});

//请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
  loadingInstance;
  nprogress.start(); //进度条开始
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (res: AxiosResponse) => {
    nprogress.done(); //进度条结束
    loadingInstance.close();
    return res.data;
  },
  (error: Error) => {
    return Promise.reject(new Error(`失败错误码${error.message}`));
  },
);

export default request;
