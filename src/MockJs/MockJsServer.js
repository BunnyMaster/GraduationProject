import Mock from "mockjs";

// //引入数据
import MenuBarData from "./MenuBarData.json";
import DeviceFaultReportingData from "./DeviceFaultReporting.json";
//mock数据 模拟数据---需要在mainjs引入
Mock.mock("/mock/menubarlist", { code: 200, data: MenuBarData });
Mock.mock("/mock/DeviceFaultReporting", {
  code: 200,
  data: DeviceFaultReportingData,
});