<template>
  <HomeTableCommon
    :tableList="tableList"
    :tableData="Data.ElectronicScaleAllLIst"
    :AllPageSize="Data.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
    @ChangeTableData="Fun.ChangeTableData"
  >
    <template #default>
      <el-table
        v-loading="loading"
        v-bind="$route.meta.title ? (loading = false) : (loading = true)"
        element-loading-text="数据加载中..."
        element-loading-background="rgba(255, 255, 255, 0.8)"
        :data="Data.ElectronicScaleAllLIst"
        style="width: 100%"
        stripe
        :row-class-name="Fun.tableRowClassName"
        :default-sort="{ prop: 'date', order: 'descending' }"
        max-height="650"
      >
        <template #empty>
          <el-empty>
            <template #description> 暂无数据</template>
            <el-button type="primary" @click="Fun.GetElectronicScaleList()">刷新</el-button>
          </el-empty>
        </template>
        <!--      TODO 设备条码-->
        <el-table-column align="center" :fixed="'left'" sortable prop="BarCodeEquipment" label="设备条码" width="366" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <JsBarcode v-bind="(loading = false)" :jsbarcodeInfo="scope.row.BarCodeEquipment" :text="$route.meta.title" />
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 设备类型  -->
        <el-table-column align="center" :fixed="'left'" sortable="custom" prop="ScaleName" label="设备类型" width="150">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon :size="16"><Platform /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.ScaleName }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO --- 设备规格-->
        <el-table-column align="center" :fixed="'left'" prop="date" label="设备规格" width="150">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span>{{ scope.row.specificationOfEquipment }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站-->
        <el-table-column
          align="center"
          prop="workStation"
          label="所属工站"
          width="166"
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
            <el-tag :type="scope.row.SubordinateStation === '1号位' ? '' : 'success'" disable-transitions>{{ scope.row.SubordinateStation }}</el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   时间-->
        <el-table-column align="center" prop="purchasingPeriod" label="时间" width="266">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              <el-icon style="margin-right: 10px"><Timer /></el-icon>
              {{ scope.row.purchasingPeriod ? scope.row.purchasingPeriod.replace("T", " ").replace(".000Z", "") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 称量范围   -->
        <el-table-column align="center" prop="WeighingScale" label="称量范围" width="180">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">{{ scope.row.WeighingScale }} KG</span>
          </template>
        </el-table-column>
        <!--   TODO --- 重量  -->
        <el-table-column align="center" prop="weight" label="重量" width="180">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">{{ scope.row.weight }} KG</span>
          </template>
        </el-table-column>
        <!-- TODO ---  供应商   -->
        <el-table-column align="center" prop="manufacturer" label="供应商" width="600">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">{{ scope.row.manufacturer }}</span>
          </template>
        </el-table-column>
        <!--  TODO ---  生产商  -->
        <el-table-column align="center" prop="supplier" label="生产商" width="166">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.supplier ? scope.row.supplier.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 出厂编号   -->
        <el-table-column align="center" prop="manufacturing" label="出厂编号" width="266">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.manufacturing ? scope.row.manufacturing.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--   TODO ---   用途-->
        <el-table-column align="center" prop="USEFor" label="用途" width="400">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.USEFor ? scope.row.USEFor.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 资产负责人   -->
        <el-table-column align="center" prop="PrincipalOfAssets" label="资产负责人" width="120">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.PrincipalOfAssets ? scope.row.PrincipalOfAssets.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 所有权部门   -->
        <el-table-column
          align="center"
          prop="DepartmentOfOwnership"
          label="所有权部门"
          width="130"
          :filters="[
            { text: '行政办公室', value: '行政办公室' },
            { text: '人力资源部', value: '人力资源部' },
            { text: '财务部', value: '财务部' },
            { text: '生产技术部', value: '生产技术部' },
            { text: '计划营销部', value: '计划营销部' },
            { text: '安全监察部', value: '安全监察部' },
            { text: '技术部', value: '技术部' },
          ]"
          :filter-method="Fun.filterDepartmentOfOwnership"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.filterTagDepartmentOfOwnership(scope.row.DepartmentOfOwnership)" disable-transitions>
              {{ scope.row.DepartmentOfOwnership ? scope.row.DepartmentOfOwnership.replaceAll("'", "") : "" }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import JsBarcode from "@/components/JsBarcode.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Timer, Platform } from "@element-plus/icons-vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { useStore } from "vuex";

interface User {
  id: string;
  BarCodeEquipment: string;
  specificationOfEquipment: string;
  purchasingPeriod: string;
  workStation: string;
  SubordinateStation: string;
  ScaleName: string;
  WeighingScale: string;
  weight: string;
  supplier: string;
  manufacturer: string;
  DepartmentOfOwnership: string;
  USEFor: string;
  manufacturing: string;
  PrincipalOfAssets: string;
  countNum: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "名称", "称量范围", "重量", "供应商", "生产商", "出厂编号", "用途", "资产负责人", "所有权部门"];
const loading = ref(true);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  ElectronicScaleAllLIst: store.state.ElectronicScale.ElectronicScaleAllLIst,
  AllPageSize: computed(() => store.state.ElectronicScale.CountPage),
});
const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
  },
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.workStation === value;
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
  handleEdit(index, row) {},
  // TODO 点击删除
  handleDelete(index, row: string) {
    row.split("、");
  },
  // TODO GET 派发 电子秤GET请求
  async GetElectronicScaleList() {
    store.dispatch("GetElectronicScaleList", { index: Data.currentPage, pageSize: Data.pageSize });
  },
  //  所属工站
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
  filterDepartmentOfOwnership(value: string, row: User) {
    return row.PersonLeave === value;
  },
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GetElectronicScaleList();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GetElectronicScaleList();
  },
  // TODO 改变数组ChangeTableData
  ChangeTableData(Val: string) {
    let list: string[] = [];
    if (Val) {
      Data.ElectronicScaleAllLIst.forEach((Name: any) => {
        if (Name.manufacturer.toString() === Val.toString()) list.push(Name);
      });
      Data.ElectronicScaleAllLIst = computed(() => list);
    } else {
      Data.ElectronicScaleAllLIst = computed(() => store.state.AndroidPAD.AllTableList);
    }
  },
});

onMounted(() => {
  Fun.GetElectronicScaleList();
  watch(
    () => store.state.ElectronicScale.ElectronicScaleAllLIst,
    () => (Data.ElectronicScaleAllLIst = store.state.ElectronicScale.ElectronicScaleAllLIst),
    { deep: true },
  );
});
</script>
<style scoped lang="less">
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
