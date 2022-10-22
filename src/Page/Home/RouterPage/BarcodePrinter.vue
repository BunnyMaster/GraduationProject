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
        <el-table-column align="center" :fixed="'left'" prop="BarCodeEquipment" label="设备条码" width="366" style="text-align: center; padding: 3px">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <JsBarcode v-bind="(loading = false)" :jsbarcodeInfo="scope.row.BarCodeEquipment" :text="$route.meta.title" />
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 采购时间  -->
        <el-table-column align="center" fixed sortable="custom" prop="purchasingPeriod" label="采购时间" width="186">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.purchasingPeriod ? scope.row.purchasingPeriod.replace("T", " ").replace(".000Z", "") : "" }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   设备类型-->
        <el-table-column align="center" prop="specificationOfEquipment" label="设备类型" width="100">
          <template #default="scope">
            <span>{{ scope.row.specificationOfEquipment }}</span>
          </template>
        </el-table-column>
        <!--   TODO ---   设备规格-->
        <el-table-column align="center" prop="WeighingScale" label="设备规格" width="100">
          <template #default="scope">
            <span>{{ scope.row.WeighingScale }}</span>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站-->
        <el-table-column
          align="center"
          prop="workStation"
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
        <el-table-column align="center" prop="SubordinateStation" label="所属工位" width="100">
          <template #default="scope">
            <span>{{ scope.row.SubordinateStation }}</span>
          </template>
        </el-table-column>
        <!--  TODO --- 所有权部门   -->
        <el-table-column align="center" prop="DepartmentOfOwnership" label="所有权部门" width="130">
          <template #default="scope">
            <span>{{ scope.row.DepartmentOfOwnership }}</span>
          </template>
        </el-table-column>
        <!--   TODO ---   名称-->
        <el-table-column align="center" prop="manufacturing" label="出厂编号" width="266" />
        <!--  TODO --- 称量范围   -->
        <el-table-column align="center" prop="USEFor" label="用途" width="180" />
        <!--  TODO --- 资产负责人   -->
        <el-table-column align="center" prop="PrincipalOfAssets" label="资产负责人" width="120" />
        <el-table-column align="center" fixed="right" label="操作" width="190">
          <template #default>
            <el-button type="success" size="large" plain @click="Fun.handleEdit()"> 添加 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import JsBarcode from "@/components/JsBarcode.vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { Timer } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "采购时间", "创建时间", "所属工站", "所属工位", "所有权部门", "称量范围", "供应商", "生产商", "资产负责人"];
const loading = ref(true);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.BarcodePrinter.countPage),
});
var tableData = computed(() => store.state.BarcodePrinter.BarcodePrinterLsit);
const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
  },
  // TODO 所属工站
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
  //TODO 点击编辑
  handleEdit() {
    store.dispatch("addBarcodePrinter");
    Fun.GetBarcodePrinter();
  },
  //  TODO 获取打印机列表
  async GetBarcodePrinter() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GetBarcodePrinter", { index: Data.currentPage, pageSize: Data.pageSize });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
  },
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GetBarcodePrinter();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GetBarcodePrinter();
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
  Fun.GetBarcodePrinter();
  watch(
    () => computed(() => store.state.BarcodePrinter.countPage),
    () => (tableData = store.state.BarcodePrinter.BarcodePrinterLsit),
    { deep: true },
  );
});
</script>
