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
// TODO 获取全部列表---安卓PAD  /api/equipment/AndroidPAD
export const reqAndroidPADList = data => {
  return Request({ url: `/equipment/AndroidPAD/?index=${data.index}&count=${data.count}`, method: "GET" });
};
// TODO 随机添加---安卓PAD  /api/equipment/AndroidPAD
export const reqAndroidPADListAdd = () => {
  return Request({ url: "/equipment/AndroidPAD", method: "POST" });
};
// TODO 添加指定内容---安卓PAD  /api/equipment/AndroidPADAddItem
export const reqAndroidPADAddItem = data => {
  return Request({
    url: `/equipment/AndroidPADAddItem?BarCodeEquipment=${data.BarCodeEquipment}&DepartmentOfOwnership=${data.DepartmentOfOwnership}&DeviceType=${data.DeviceType}&PrincipalOfAssets=${data.PrincipalOfAssets}&SubordinateStation=${data.SubordinateStation}&batteryCapacity=${data.batteryCapacity}&coreNumber=${data.coreNumber}&id= ${data.id}&manufacturer= ${data.manufacturer}&memory=${data.memory}&purchasingPeriod=${data.purchasingPeriod}&resolutionRatio=${data.resolutionRatio}&specificationOfEquipment=${data.specificationOfEquipment}&supplier=${data.supplier}&workStation=${data.workStation}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "text/json" },
    method: "POST",
  });
};
