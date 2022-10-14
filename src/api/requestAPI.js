import MockRequest from "@/utils/requestMcokJs";
import Request from "@/utils/request";
// TODO Mock-请求菜单栏数据列表
export const reqMenuBarList = () => {
  //左侧菜单栏数据
  return MockRequest({ url: "/menubarlist", method: "GET" });
};
// TODO 故障上报类型和位置
export const reqDeviceFaultReporting = () => {
  return MockRequest({ url: "/DeviceFaultReporting", method: "GET" });
};
