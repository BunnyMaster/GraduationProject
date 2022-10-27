import MockRequest from "@/utils/requestMcokJs";
import Request from "@/utils/request";
import qs from "qs";
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

// TODO 登录信息 LoginHome?UserName=admin
export const reqLoginHome = data => {
  return Request({ url: `/equipment/LoginHome?UserName=${data}`, method: "POST" });
};

// TODO 用户登录 ?UserName=${data.UserName}&UserPwd1=${data.UserPwd}
export const reqLogin = data => {
  return Request({ url: `/equipment/Login?UserName=${data.UserName}&UserPwd=${data.UserPwd}`, method: "POST" });
};

// TODO 注册信息 /equipment/register  UserName=12345&as=12
export const reqRegister = data => {
  return Request({ url: `/equipment/register?UserName=${data.UserName}&UserPwd1=${data.UserPwd1}`, method: "POST" });
};

// TODO 获取未修工单 /equipment/RepairBill?Name=admin
export const reqReoairList = data => {
  return Request({ url: `/equipment/RepairBill?Name=${data}`, method: "GET" });
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

// TODO 获取电子秤全部  /equipment/ElectronicScale
export const reqElectronicScale = query => {
  return Request({ url: `/equipment/ElectronicScale?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 条码打印机 GET /equipment/BarcodePrinter?index=0&pageSize=10
export const reqBarcodePrinter = query => {
  return Request({ url: `/equipment/BarcodePrinter?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 随机添加---条码打印机  /api/equipment//BarcodePrinter
export const reqBarcodePrinteradd = () => {
  return Request({ url: "/equipment/BarcodePrinter", method: "POST" });
};

// TODO 随机添加---红外对射枪  /api/equipment/InfraredCounterGun
export const reqInfraredCounterGunadd = () => {
  return Request({ url: "/equipment/InfraredCounterGun", method: "POST" });
};

// TODO 条码打印机 GET /equipment/InfraredCounterGun?index=0&pageSize=10
export const reqInfraredCounterGun = query => {
  return Request({ url: `/equipment/InfraredCounterGun?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取企业列表 GET /equipment/Company?index=0&pageSize=10
export const reqCompany = query => {
  return Request({ url: `/equipment/Company?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
  // return Request({ url: `/equipment/Company`, method: "GET" });
};

// TODO 获取工厂列表 GET /equipment/Company?index=0&pageSize=10
export const reqfactory = query => {
  return Request({ url: `/equipment/factory?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
  // return Request({ url: `/equipment/factory`, method: "GET" });
};

// TODO 获取工厂信息 Workshop
export const reqWorkshop = query => {
  return Request({ url: `/equipment/Workshop?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
  // return Request({ url: `/equipment/factory`, method: "GET" });
};

// TODO 获取员工信息 staff
export const reqstaff = query => {
  return Request({ url: `/equipment/staff?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
  // return Request({ url: `/equipment/factory`, method: "GET" });
};

/*// TODO 随机添加---红外对射枪  /api/equipment/InfraredCounterGun
export const reqtest = data => {
  return Request({
    url: "/equipment/test",
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};*/

// TODO 获取全部维修工单信息  /api/equipment/RepairReacrd
export const reqRepairReacrd = () => {
  return Request({ url: `/equipment/RepairReacrd`, method: "GET" });
  // return Request({ url: `/equipment/factory`, method: "GET" });
};

// TODO 随机添加---红外对射枪  /api/equipment/InfraredCounterGun
export const ReqRepairList = data => {
  return Request({
    url: "/equipment/ReqRepairList",
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 修改维修工单状态
export const reqRepairDispach = query => {
  return Request({ url: `/equipment/RepairDispach?index=${query.index}`, method: "POST" });
};

// TODO 删除工单 DeleteRepairDispach
export const reqDeleteRepairDispach = query => {
  return Request({ url: `/equipment/DeleteRepairDispach?index=${query.index}`, method: "POST" });
};

// TODO 获取设备台账信息
export const reqGETequipmentledger = query => {
  return Request({ url: `/equipment/GETequipmentledger?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取员工上岗记录信息 /equipment/MountGuardRecords?index=1&pageSize=10
export const reqGETMountGuardRecords = query => {
  return Request({ url: `/equipment/MountGuardRecords?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取订单管理信息
export const reqGETOrderManagement = query => {
  return Request({ url: `/equipment/OrderManagement?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取维护订单信息
export const reqGETRepairOrderMaintenance = query => {
  return Request({ url: `/equipment/RepairOrderMaintenance?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取获取工艺数据  ProcessMaintenance-ProcessFlowMaintenance
export const reqGETProcessMaintenance = query => {
  return Request({ url: `/equipment/ProcessMaintenance?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取工艺流程数据  ProcessMaintenance-ProcessFlowMaintenance
export const reqGETProcessFlowMaintenance = query => {
  return Request({ url: `/equipment/ProcessFlowMaintenance?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取工艺和流程 ProcessMaintenance-ProcessFlowMaintenance单信息ProcessMaintenanceANDFlowMaintenance
export const reqGETProcessMaintenanceANDFlowMaintenance = query => {
  return Request({ url: `/equipment/ProcessMaintenanceANDFlowMaintenance?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取员工表 PerformanceStaff
export const reqGETPerformanceStaff = query => {
  return Request({ url: `/equipment/PerformanceStaff?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取配置表 PerformanceConfig
export const reqGETPerformanceConfig = query => {
  return Request({ url: `/equipment/PerformanceConfig?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};

// TODO 获取总表 Performance
export const reqGETPerformance = query => {
  return Request({ url: `/equipment/Performance?index=${query.index}&pageSize=${query.pageSize}`, method: "GET" });
};
