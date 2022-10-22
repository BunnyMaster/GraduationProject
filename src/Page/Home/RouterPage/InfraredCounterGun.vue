<template>
  <HomeTableCommon
    :tableList="tableList"
    :tableData="tableData"
    :AllPageSize="Data.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
    @ChangeTableData="Fun.ChangeTableData"
  >
    <template #default>
      <el-table :data="tableData" style="width: 100%" stripe :row-class-name="Fun.tableRowClassName" :default-sort="{ prop: 'date', order: 'descending' }" max-height="650">
        <template #empty>
          <el-empty>
            <template #description> 暂无数据 </template>
            <el-button type="primary">刷新</el-button>
          </el-empty>
        </template>
        <!--      TODO 设备条码-->
        <el-table-column align="center" :fixed="'left'" prop="date" label="设备条码" width="366" style="text-align: center; padding: 3px">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <JsBarcode v-bind="(loading = false)" :jsbarcodeInfo="scope.row.BarCodeEquipment" :text="$route.meta.title" />
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   设备类型-->
        <el-table-column align="center" prop="DeviceType" label="设备类型" width="100">
          <template #default="scope">
            <span>{{ scope.row.DeviceType }}</span>
          </template>
        </el-table-column>
        <!--   TODO ---   设备规格-->
        <el-table-column align="center" prop="SensingDistance" label="设备规格" width="166">
          <template #default="scope">
            <span>直射距离 {{ scope.row.SensingDistance }} CM/厘米</span>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站-->
        <el-table-column
          align="center"
          prop="tag"
          label="所属工站"
          width="100"
          :filters="[
            { text: '金龙鱼生产线', value: '金龙鱼生产线' },
            { text: '鱿鱼丝生产线', value: '鱿鱼丝生产线' },
            { text: '金枪鱼生产线', value: '金枪鱼生产线' },
            { text: '马哈鱼生产线', value: '马哈鱼生产线' },
          ]"
          :filter-method="Fun.filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.workStationClass(scope.row.workStation)" disable-transitions>{{ scope.row.workStation }}</el-tag>
          </template>
        </el-table-column>
        <!--    TODO ---  所属工位-->
        <el-table-column align="center" prop="SubordinateStation" label="所属工位" width="100" :filter-method="Fun.filterTag" filter-placement="bottom-end">
          <template #default="scope">
            <span>{{ scope.row.SubordinateStation }}</span>
          </template>
        </el-table-column>
        <!--  TODO ---  感应距离  -->
        <el-table-column align="center" prop="SensingDistance" label="感应距离" width="166">
          <template #default="scope">
            <span>{{ scope.row.SensingDistance }} CM/厘米</span>
          </template>
        </el-table-column>
        <!--  TODO ---  感应方式  -->
        <el-table-column align="center" prop="ClassFacility" label="感应方式" width="166" />
        <!--   TODO --- 采购时间  -->
        <el-table-column align="center" fixed sortable prop="PurchaseTime" label="采购时间" width="266" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.PurchaseTime ? scope.row.PurchaseTime.replace("T", " ").replace(".000Z", "") : "" }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   出厂编号-->
        <el-table-column align="center" prop="GoNumber" label="出厂编号" width="266" />
        <!--  TODO --- 用途   -->
        <el-table-column align="center" prop="SensingWay" label="用途" width="180" />
        <!--  TODO --- 所有权部门   -->
        <el-table-column
          align="center"
          prop="tag"
          label="所有权部门"
          width="130"
          :filters="DepartmentOfOwnershipList"
          :filter-method="Fun.DepartmentOfOwnershipListfilterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.filterTagDepartmentOfOwnership(scope.row.DepartmentOfOwnership)" disable-transitions>{{ scope.row.DepartmentOfOwnership }}</el-tag>
          </template>
        </el-table-column>
        <!--  TODO --- 资产负责人   -->
        <el-table-column align="center" prop="PrincipalOfAssets" label="资产负责人" width="120" />
        <!--  TODO --- 操作   -->
        <el-table-column align="center" fixed="right" label="操作" width="190">
          <template #default="scope">
            <el-button type="success" size="large" round @click="Fun.handleEdit()"> 添加 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import JsBarcode from "@/components/JsBarcode.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { Timer } from "@element-plus/icons-vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
const loading = ref(true);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.InfraredCounterGun.countPage),
});
var tableData = computed(() => store.state.InfraredCounterGun.InfraredCounterGunList);
const DepartmentOfOwnershipList = [
  { text: "行政办公室", value: "行政办公室" },
  { text: "人力资源部", value: "人力资源部" },
  { text: "财务部", value: "财务部" },
  { text: "生产技术部", value: "生产技术部" },
  { text: "计划营销部", value: "计划营销部" },
  { text: "安全监察部", value: "安全监察部" },
  { text: "技术部", value: "技术部" },
];
const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
  },
  // TODO 过滤所有权部门
  DepartmentOfOwnershipListfilterTag(value: string, row: User) {
    return row.DepartmentOfOwnership === value;
  },
  //  TODO 过滤标签
  filterTagDepartmentOfOwnership(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "行政办公室":
        flag = "success";
        break;
      case "人力资源部":
        flag = "warning";
        break;
      case "财务部":
        flag = "danger";
        break;
      case "生产技术部":
        flag = "";
        break;
      case "计划营销部":
        flag = "";
        break;
      case "安全监察部":
        flag = "";
        break;
      case "技术部":
        flag = "";
        break;
    }
    return flag;
  },
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.tag === value;
  },
  // TODO
  tableRowClassName({ row, rowIndex }: { row: User; rowIndex: number }) {
    if (rowIndex === 1) {
      return "warning-row";
    } else if (rowIndex === 3) {
      return "success-row";
    }
    return "";
  },
  // TODO 获取对射枪列表
  async GetInfraredCounterGunList() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GetInfraredCounterGunList", { index: Data.currentPage, pageSize: Data.pageSize });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
  },
  // TODO 点击编辑
  handleEdit() {
    ElMessage.closeAll();
    try {
      store.dispatch("InfraredCounterGunadd");
      ElMessage({
        showClose: true,
        message: "添加成功",
        type: "success",
        center: true,
      });
      Fun.GetInfraredCounterGunList();
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
  }, // TODO 所属工站
  workStationClass(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "金龙鱼生产线":
        flag = "success";
        break;
      case "鱿鱼丝生产线":
        flag = "warning";
        break;
      case "金枪鱼生产线":
        flag = "danger";
        break;
      case "马哈鱼生产线":
        flag = "";
        break;
    }
    return flag;
  },
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GetInfraredCounterGunList();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GetInfraredCounterGunList();
  },
  // TODO 改变数组ChangeTableData
  ChangeTableData(Val: string) {
    let list: string[] = [];
    if (Val) {
      tableData.value.forEach((Name: any) => {
        if (Name.manufacturer.toString() === Val.toString()) list.push(Name);
      });
      tableData = computed(() => list);
    } else {
      tableData = computed(() => store.state.AndroidPAD.AllTableList);
    }
  },
});

onMounted(() => {
  Fun.GetInfraredCounterGunList();
});
</script>
