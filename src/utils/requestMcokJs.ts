/**
 * 对axios二次封装
 * 利用axios 对象的方法create 去创建一个axios实例
 * request就是axios只不过稍微配置了下
 * */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
/**
 * 进度条
 * strat()开始动
 * done()结束
 * 引入进度条样式
 * */
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const request = axios.create({
  baseURL: "/mock", //请求的基础路径
  timeout: 5000, //超时时间
});

//请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
  nprogress.start(); //进度条开始
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (res: AxiosResponse) => {
    nprogress.done(); //进度条结束
    return res.data;
  },
  (error: Error) => {
    return Promise.reject(new Error("失败"));
  },
);

export default request;
