const homeChildren = [
  { path: "/home/main", redirect: "/home/main/MainPage" },
  {
    path: "/home/main",
    component: () => import("@/Page/Home/index.vue"),
  },
  //首页
  {
    path: "/home/main/MainPage",
    component: () => import("@/Page/MainPage.vue"),
    meta: { title: "系统首页" },
  },
  //日历
  {
    path: "/home/main/calendar",
    component: () => import("@/Page/Home/RouterPage/calendar.vue"),
    meta: { title: "日历" },
  },
  //安卓PAD
  {
    path: "/home/main/AndroidPAD",
    component: () => import("@/Page/Home/RouterPage/AndroidPAD.vue"),
    meta: { title: "安卓PAD" },
  },
  //电子秤
  {
    path: "/home/main/ElectronicScale",
    component: () => import("@/Page/Home/RouterPage/ElectronicScale.vue"),
    meta: { title: "电子秤" },
  },
  //条码打印机
  {
    path: "/home/main/BarcodePrinter",
    component: () => import("@/Page/Home/RouterPage/BarcodePrinter.vue"),
    meta: { title: "条码打印机" },
  },
  //红外对射枪
  {
    path: "/home/main/InfraredCounterGun",
    component: () => import("@/Page/Home/RouterPage/InfraredCounterGun.vue"),
    meta: { title: "红外对射枪" },
  },
  //读卡器
  {
    path: "/home/main/CardReader",
    component: () => import("@/Page/Home/RouterPage/CardReader.vue"),
    meta: { title: "读卡器" },
  },
  //企业
  {
    path: "/home/main/Enterprise",
    component: () => import("@/Page/Home/RouterPage/Enterprise.vue"),
    meta: { title: "企业" },
  },
  //工厂
  {
    path: "/home/main/Plant",
    component: () => import("@/Page/Home/RouterPage/Plant.vue"),
    meta: { title: "工厂" },
  },

  //车间
  {
    path: "/home/main/WorkShop",
    component: () => import("@/Page/Home/RouterPage/WorkShop.vue"),
    meta: { title: "车间" },
  },
  //产线
  {
    path: "/home/main/ProductionLine",
    component: () => import("@/Page/Home/RouterPage/ProductionLine.vue"),
    meta: { title: "产线" },
  },
  //工站
  {
    path: "/home/main/Workstation",
    component: () => import("@/Page/Home/RouterPage/Workstation.vue"),
    meta: { title: "工站" },
  },
  //工位
  {
    path: "/home/main/Station",
    component: () => import("@/Page/Home/RouterPage/Station.vue"),
    meta: { title: "工位" },
  },
  //员工
  {
    path: "/home/main/staff",
    component: () => import("@/Page/Home/RouterPage/staff.vue"),
    meta: { title: "员工" },
  },
  //工位与员工信息
  {
    path: "/home/main/StationAndEmployeeInformation",
    component: () => import("@/Page/Home/RouterPage/StationAndEmployeeInformation.vue"),
    meta: { title: "工位与员工信息" },
  },
  //原料库存清单
  {
    path: "/home/main/RawMaterialInventoryList",
    component: () => import("@/Page/Home/RouterPage/RawMaterialInventoryList.vue"),
    meta: { title: "原料库存清单" },
  },
  //原料库存清单
  {
    path: "/home/main/RawMaterialInventoryList",
    component: () => import("@/Page/Home/RouterPage/RawMaterialInventoryList.vue"),
    meta: { title: "原料库存清单" },
  },
  //产品
  {
    path: "/home/main/product",
    component: () => import("@/Page/Home/RouterPage/product.vue"),
    meta: { title: "产品" },
  },
  //BOM物料
  {
    path: "/home/main/BOMMaterial",
    component: () => import("@/Page/Home/RouterPage/BOMMaterial.vue"),
    meta: { title: "BOM物料" },
  },
  //BOM物料详情
  {
    path: "/home/main/BOMMaterialDetails",
    component: () => import("@/Page/Home/RouterPage/BOMMaterialDetails.vue"),
    meta: { title: "BOM物料详情" },
  },
  //BOM物料详情
  {
    path: "/home/main/BOMMaterialDetails",
    component: () => import("@/Page/Home/RouterPage/BOMMaterialDetails.vue"),
    meta: { title: "BOM物料详情" },
  },
  //绩效报表
  {
    path: "/home/main/PerformanceManagement",
    component: () => import("@/Page/Home/RouterPage/PerformanceManagement.vue"),
    meta: { title: "绩效报表" },
  },
  //绩效参数配置
  {
    path: "/home/main/PerformanceParameterConfiguration",
    component: () => import("@/Page/Home/RouterPage/PerformanceParameterConfiguration.vue"),
    meta: { title: "绩效参数配置" },
  },
  //绩效参数与工站的关系
  {
    path: "/home/main/Relationshipstation",
    component: () => import("@/Page/Home/RouterPage/Relationshipstation.vue"),
    meta: { title: "绩效参数与工站的关系" },
  },
  //上岗记录
  {
    path: "/home/main/MountGuardRecords",
    component: () => import("@/Page/Home/RouterPage/MountGuardRecords.vue"),
    meta: { title: "上岗记录" },
  },
  //订单管理
  {
    path: "/home/main/OrderManagement",
    component: () => import("@/Page/Home/RouterPage/OrderManagement.vue"),
    meta: { title: "订单管理" },
  },
  //订单管理
  {
    path: "/home/main/OrderManagement",
    component: () => import("@/Page/Home/RouterPage/OrderManagement.vue"),
    meta: { title: "订单管理" },
  },
  //工单维护
  {
    path: "/home/main/RepairOrderMaintenance",
    component: () => import("@/Page/Home/RouterPage/RepairOrderMaintenance.vue"),
    meta: { title: "工单维护" },
  },
  //工单维护
  {
    path: "/home/main/RepairOrderMaintenance",
    component: () => import("@/Page/Home/RouterPage/RepairOrderMaintenance.vue"),
    meta: { title: "工单维护" },
  },
  //工序维护
  {
    path: "/home/main/ProcessMaintenance",
    component: () => import("@/Page/Home/RouterPage/ProcessMaintenance.vue"),
    meta: { title: "工序维护" },
  },
  //工序维护
  {
    path: "/home/main/ProcessFlowMaintenance",
    component: () => import("@/Page/Home/RouterPage/ProcessFlowMaintenance.vue"),
    meta: { title: "工序维护" },
  },
  //工艺流程与工序关系
  {
    path: "/home/main/ProcessflowAndProcessRelationship",
    component: () => import("@/Page/Home/RouterPage/ProcessflowAndProcessRelationship.vue"),
    meta: { title: "工艺流程与工序关系" },
  },
  //工序与工站关系
  {
    path: "/home/main/stationrelationship",
    component: () => import("@/Page/Home/RouterPage/stationrelationship.vue"),
    meta: { title: "工序与工站关系" },
  },
  //违规管理
  {
    path: "/home/main/BadManagement",
    component: () => import("@/Page/Home/RouterPage/BadManagement.vue"),
    meta: { title: "违规管理" },
  },
  //残次品上报管理
  {
    path: "/home/main/DefectiveProducts",
    component: () => import("@/Page/Home/RouterPage/DefectiveProducts.vue"),
    meta: { title: "残次品上报管理" },
  },
  //异常工序检测
  {
    path: "/home/main/AbnormalProcessDetection",
    component: () => import("@/Page/Home/RouterPage/AbnormalProcessDetection.vue"),
    meta: { title: "异常工序检测" },
  },
  //切片质量检测
  {
    path: "/home/main/SectionQualityInspection",
    component: () => import("@/Page/Home/RouterPage/SectionQualityInspection.vue"),
    meta: { title: "切片质量检测" },
  },
  //设备台账
  {
    path: "/home/main/EquipmentLedger",
    component: () => import("@/Page/Home/RouterPage/EquipmentLedger.vue"),
    meta: { title: "设备台账" },
  },
  //设备保养计划
  {
    path: "/home/main/EquipmentMaintenancePlan",
    component: () => import("@/Page/Home/RouterPage/EquipmentMaintenancePlan.vue"),
    meta: { title: "设备保养计划" },
  },
  //设备报修派工记录
  {
    path: "/home/main/RepairAndDispatch",
    component: () => import("@/Page/Home/RouterPage/RepairAndDispatch.vue"),
    meta: { title: "设备报修派工记录" },
  },
  //设备故障上报
  {
    path: "/home/main/DeviceFaultReporting",
    component: () => import("@/Page/Home/RouterPage/DeviceFaultReporting.vue"),
    meta: { title: "设备故障上报" },
  },
  //
  {
    path: "/home/main/EquipmentMaintenanceRecord",
    component: () => import("@/Page/Home/RouterPage/EquipmentMaintenanceRecord.vue"),
    meta: { title: "设备维修记录" },
  },
];
export default homeChildren;
