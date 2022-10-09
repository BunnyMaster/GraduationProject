const homeChildren = [
  { path: "/home/main", component: () => import("@/Page/Home/index.vue") },
  //日历
  {
    path: "/home/main/calendar",
    component: () => import("@/Page/Home/RouterPage/calendar.vue"),
  },
  //安卓PAD
  {
    path: "/home/main/AndroidPAD",
    component: () => import("@/Page/Home/RouterPage/AndroidPAD.vue"),
  },
  //电子秤
  {
    path: "/home/main/ElectronicScale",
    component: () => import("@/Page/Home/RouterPage/ElectronicScale.vue"),
  },
  //条码打印机
  {
    path: "/home/main/BarcodePrinter",
    component: () => import("@/Page/Home/RouterPage/BarcodePrinter.vue"),
  },
  //红外对射枪
  {
    path: "/home/main/InfraredCounterGun",
    component: () => import("@/Page/Home/RouterPage/InfraredCounterGun.vue"),
  },
  //读卡器
  {
    path: "/home/main/CardReader",
    component: () => import("@/Page/Home/RouterPage/CardReader.vue"),
  },
  //企业
  {
    path: "/home/main/Enterprise",
    component: () => import("@/Page/Home/RouterPage/Enterprise.vue"),
  },
  //工厂
  {
    path: "/home/main/Plant",
    component: () => import("@/Page/Home/RouterPage/Plant.vue"),
  },

  //车间
  {
    path: "/home/main/WorkShop",
    component: () => import("@/Page/Home/RouterPage/WorkShop.vue"),
  },
  //产线
  {
    path: "/home/main/ProductionLine",
    component: () => import("@/Page/Home/RouterPage/ProductionLine.vue"),
  },
  //工站
  {
    path: "/home/main/Workstation",
    component: () => import("@/Page/Home/RouterPage/Workstation.vue"),
  },
  //工位
  {
    path: "/home/main/Station",
    component: () => import("@/Page/Home/RouterPage/Station.vue"),
  },
  //员工
  {
    path: "/home/main/staff",
    component: () => import("@/Page/Home/RouterPage/staff.vue"),
  },
  //工位与员工信息
  {
    path: "/home/main/StationAndEmployeeInformation",
    component: () =>
      import("@/Page/Home/RouterPage/StationAndEmployeeInformation.vue"),
  },
  //原料库存清单
  {
    path: "/home/main/RawMaterialInventoryList",
    component: () =>
      import("@/Page/Home/RouterPage/RawMaterialInventoryList.vue"),
  },
  //原料库存清单
  {
    path: "/home/main/RawMaterialInventoryList",
    component: () =>
      import("@/Page/Home/RouterPage/RawMaterialInventoryList.vue"),
  },
  //产品
  {
    path: "/home/main/product",
    component: () => import("@/Page/Home/RouterPage/product.vue"),
  },
  //BOM物料
  {
    path: "/home/main/BOMMaterial",
    component: () => import("@/Page/Home/RouterPage/BOMMaterial.vue"),
  },
  //BOM物料详情
  {
    path: "/home/main/BOMMaterialDetails",
    component: () => import("@/Page/Home/RouterPage/BOMMaterialDetails.vue"),
  },
  //BOM物料详情
  {
    path: "/home/main/BOMMaterialDetails",
    component: () => import("@/Page/Home/RouterPage/BOMMaterialDetails.vue"),
  },
  //绩效报表
  {
    path: "/home/main/PerformanceManagement",
    component: () => import("@/Page/Home/RouterPage/PerformanceManagement.vue"),
  },
  //绩效参数配置
  {
    path: "/home/main/PerformanceParameterConfiguration",
    component: () =>
      import("@/Page/Home/RouterPage/PerformanceParameterConfiguration.vue"),
  },
  //绩效参数与工站的关系
  {
    path: "/home/main/Relationshipstation",
    component: () => import("@/Page/Home/RouterPage/Relationshipstation.vue"),
  },
  //上岗记录
  {
    path: "/home/main/MountGuardRecords",
    component: () => import("@/Page/Home/RouterPage/MountGuardRecords.vue"),
  },
  //订单管理
  {
    path: "/home/main/OrderManagement",
    component: () => import("@/Page/Home/RouterPage/OrderManagement.vue"),
  },
  //订单管理
  {
    path: "/home/main/OrderManagement",
    component: () => import("@/Page/Home/RouterPage/OrderManagement.vue"),
  },
  //工单维护
  {
    path: "/home/main/RepairOrderMaintenance",
    component: () =>
      import("@/Page/Home/RouterPage/RepairOrderMaintenance.vue"),
  },
  //工单维护
  {
    path: "/home/main/RepairOrderMaintenance",
    component: () =>
      import("@/Page/Home/RouterPage/RepairOrderMaintenance.vue"),
  },
  //工序维护
  {
    path: "/home/main/ProcessMaintenance",
    component: () => import("@/Page/Home/RouterPage/ProcessMaintenance.vue"),
  },
  //工序维护
  {
    path: "/home/main/ProcessFlowMaintenance",
    component: () =>
      import("@/Page/Home/RouterPage/ProcessFlowMaintenance.vue"),
  },
  //工艺流程与工序关系
  {
    path: "/home/main/ProcessflowAndProcessRelationship",
    component: () =>
      import("@/Page/Home/RouterPage/ProcessflowAndProcessRelationship.vue"),
  },
  //工序与工站关系
  {
    path: "/home/main/stationrelationship",
    component: () => import("@/Page/Home/RouterPage/stationrelationship.vue"),
  },
  //违规管理
  {
    path: "/home/main/BadManagement",
    component: () => import("@/Page/Home/RouterPage/BadManagement.vue"),
  },
  //残次品上报管理
  {
    path: "/home/main/DefectiveProducts",
    component: () => import("@/Page/Home/RouterPage/DefectiveProducts.vue"),
  },
  //异常工序检测
  {
    path: "/home/main/AbnormalProcessDetection",
    component: () =>
      import("@/Page/Home/RouterPage/AbnormalProcessDetection.vue"),
  },
  //切片质量检测
  {
    path: "/home/main/SectionQualityInspection",
    component: () =>
      import("@/Page/Home/RouterPage/SectionQualityInspection.vue"),
  },
  //设备台账
  {
    path: "/home/main/EquipmentLedger",
    component: () => import("@/Page/Home/RouterPage/EquipmentLedger.vue"),
  },
  //设备保养计划
  {
    path: "/home/main/EquipmentMaintenancePlan",
    component: () =>
      import("@/Page/Home/RouterPage/EquipmentMaintenancePlan.vue"),
  },
  //设备报修派工记录
  {
    path: "/home/main/RepairAndDispatch",
    component: () => import("@/Page/Home/RouterPage/RepairAndDispatch.vue"),
  },
  //设备故障上报
  {
    path: "/home/main/DeviceFaultReporting",
    component: () => import("@/Page/Home/RouterPage/DeviceFaultReporting.vue"),
  },
  //设备维修记录
  {
    path: "/home/main/EquipmentMaintenanceRecord",
    component: () =>
      import("@/Page/Home/RouterPage/EquipmentMaintenanceRecord.vue"),
  },
];
export default homeChildren;
