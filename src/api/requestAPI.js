import MockRequest from "@/utils/requestMcokJs";
import Request from "@/utils/request";
// TODO Mock-请求菜单栏数据列表
export const reqMenuBarList = () => {
  return MockRequest({ url: "/menubarlist", method: "GET" });
};
