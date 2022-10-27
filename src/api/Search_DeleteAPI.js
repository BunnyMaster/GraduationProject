import MockRequest from "@/utils/requestMcokJs";
import Request from "@/utils/request";
import qs from "qs";

// TODO 搜索安卓PAD  AndroidPADSearch
export const reqAndroidPADSearch = data => {
  return Request({
    url: "/equipment/AndroidPADSearch",
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除安卓PAD  AndroidPADSearch
export const reqAndroidPADDelete = data => {
  return Request({ url: `/equipment/AndroidPADDelete?id=${data.id}`, method: "POST" });
};

// TODO 搜索安卓PAD  AndroidPADSearch
export const reqElectronicScaleSearch = data => {
  return Request({
    url: "/equipment/ElectronicScaleSearch",
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除安卓PAD  AndroidPADSearch
export const reqElectronicScaleDelete = data => {
  return Request({ url: `/equipment/ElectronicScaleDelete?id=${data.id}`, method: "POST" });
};

// TODO 添加  ElectronicScaleAddItem
export const reqElectronicScaleAddItem = data => {
  return Request({
    url: `/equipment/ElectronicScaleAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 添加  BarcodePrinterSearch
export const reqBarcodePrinterAddItem = data => {
  return Request({
    url: `/equipment/BarcodePrinterSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索  BarcodePrinterSearch
export const reqBarcodePrinterSearchAddItem = data => {
  return Request({
    url: `/equipment/BarcodePrinterSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除安卓PAD  BarcodePrinterDelete
export const reqBarcodePrinterDelete = data => {
  return Request({ url: `/equipment/BarcodePrinterDelete?id=${data.id}`, method: "POST" });
};

// TODO 添加  BarcodePrinterSearch
export const reqInfraredCounterGunAddItem = data => {
  return Request({
    url: `/equipment/InfraredCounterGunAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索  BarcodePrinterSearch
export const reqInfraredCounterGunSearch = data => {
  return Request({
    url: `/equipment/InfraredCounterGunSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除安卓PAD  BarcodePrinterDelete
export const reqInfraredCounterGunDelete = data => {
  return Request({ url: `/equipment/InfraredCounterGunDelete?id=${data.id}`, method: "POST" });
};

// TODO 搜索  BarcodePrinterSearch
export const reqPerformanceStaffSearch = data => {
  return Request({
    url: `/equipment/PerformanceStaffSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索  BarcodePrinterSearch
export const reqPerformanceConfigSearch = data => {
  return Request({
    url: `/equipment/PerformanceConfigSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索  BarcodePrinterSearch
export const reqPerformanceSearch = data => {
  return Request({
    url: `/equipment/PerformanceSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除安卓PAD  BarcodePrinterDelete
export const reqPerformanceStaffDelete = data => {
  return Request({ url: `/equipment/PerformanceStaffDelete?id=${data.id}`, method: "POST" });
};

// TODO 删除安卓PAD  BarcodePrinterDelete
export const reqPerformanceConfigDelete = data => {
  return Request({ url: `/equipment/PerformanceConfigDelete?id=${data.id}`, method: "POST" });
};

// TODO 添加  BarcodePrinterSearch
export const reqPerformanceStaffAddItem = data => {
  return Request({
    url: `/equipment/PerformanceStaffAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 添加  BarcodePrinterSearch
export const reqPerformanceConfigAddItem = data => {
  return Request({
    url: `/equipment/PerformanceConfigAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索  EquipmentLedgerSearch
export const reqEquipmentLedgerSearch = data => {
  return Request({
    url: `/equipment/EquipmentLedgerSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};
// TODO 删除 EquipmentLedgerDelete
export const reqEquipmentLedgerDelete = data => {
  return Request({ url: `/equipment/EquipmentLedgerDelete?id=${data.id}`, method: "POST" });
};
// TODO 添加  EquipmentLedgerAddItem
export const reqEquipmentLedgerAddItem = data => {
  return Request({
    url: `/equipment/EquipmentLedgerAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索  EquipmentLedgerSearch
export const reqProcessMaintenanceSearch = data => {
  return Request({
    url: `/equipment/ProcessMaintenanceSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};
// TODO 删除 EquipmentLedgerDelete
export const reqProcessMaintenanceDelete = data => {
  return Request({ url: `/equipment/ProcessMaintenanceDelete?id=${data.id}`, method: "POST" });
};
// TODO 添加  EquipmentLedgerAddItem
export const reqProcessMaintenanceAddItem = data => {
  return Request({
    url: `/equipment/ProcessMaintenanceAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索  EquipmentLedgerSearch
export const reqProcessFlowMaintenanceSearch = data => {
  return Request({
    url: `/equipment/ProcessFlowMaintenanceSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};
// TODO 删除 EquipmentLedgerDelete
export const reqProcessFlowMaintenanceDelete = data => {
  return Request({ url: `/equipment/ProcessFlowMaintenanceDelete?id=${data.id}`, method: "POST" });
};
// TODO 添加  EquipmentLedgerAddItem
export const reqProcessFlowMaintenanceAddItem = data => {
  return Request({
    url: `/equipment/ProcessFlowMaintenanceAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 获取
export const reqtodolistAll = data => {
  return Request({
    url: `/equipment/todolistAll`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索
export const reqtodolistSearch = data => {
  return Request({
    url: `/equipment/todolistSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除  isShow  id
export const reqtodolistUpdateDelete = data => {
  return Request({
    url: `/equipment/todolistUpdateDelete`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 添加
export const reqtodolistAddItem = data => {
  return Request({
    url: `/equipment/todolistAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 修改状态
export const reqtodolistUpdatecomplet = data => {
  return Request({
    url: `/equipment/todolistUpdatecomplet`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索 OrderManagementSearch
export const reqOrderManagementSearch = data => {
  return Request({
    url: `/equipment/OrderManagementSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除 DeleteOrderManagement
export const reqDeleteOrderManagement = data => {
  return Request({
    url: `/equipment/DeleteOrderManagement`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 添加
export const reqOrderManagementAddItem = data => {
  return Request({
    url: `/equipment/OrderManagementAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索 OrderManagementSearch
export const reqRepairOrderMaintenanceSearch = data => {
  return Request({
    url: `/equipment/RepairOrderMaintenanceSearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除 DeleteOrderManagement
export const reqDeleteRepairOrderMaintenance = data => {
  return Request({
    url: `/equipment/DeleteRepairOrderMaintenance`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 添加
export const reqRepairOrderMaintenanceAddItem = data => {
  return Request({
    url: `/equipment/RepairOrderMaintenanceAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索 OrderManagementSearch
export const reqCompanySearch = data => {
  return Request({
    url: `/equipment/CompanySearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除 DeleteOrderManagement
export const reqDeleteCompany = data => {
  return Request({
    url: `/equipment/DeleteCompany`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 添加
export const reqCompanyAddItem = data => {
  return Request({
    url: `/equipment/CompanyAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 搜索 OrderManagementSearch
export const reqfactorySearch = data => {
  return Request({
    url: `/equipment/factorySearch`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 删除 DeleteOrderManagement
export const reqDeletefactory = data => {
  return Request({
    url: `/equipment/Deletefactory`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};

// TODO 添加
export const reqfactoryAddItem = data => {
  return Request({
    url: `/equipment/factoryAddItem`,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/json",
    },
    method: "POST",
  });
};
