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
        <!--   TODO --- 序号  -->
        <el-table-column align="center" sortable prop="id" label="序号" width="auto">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!--   TODO --- 工序名称  -->
        <el-table-column align="center" prop="ProcessMaintenanceName" label="工序名称" width="auto">
          <template #default="scope">
            <span>{{ scope.row.ProcessMaintenanceName }}</span>
          </template>
        </el-table-column>
        <!--      TODO 工站名称-->
        <el-table-column align="center" prop="ProcessMaintenanceSattionName" label="工站名称" width="auto" />
        <!--      TODO 产线名称-->
        <el-table-column align="center" prop="ProcessMaintenanceDetail" label="工艺详细信息" width="auto" />
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, onMounted, reactive } from "vue";
import { Timer, Discount } from "@element-plus/icons-vue";
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
var tableData = computed(() => store.state.ProcessMaintenanceANDFlowMaintenance.ProcessMaintenanceANDFlowMaintenanceLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.ProcessMaintenanceANDFlowMaintenance.ProcessMaintenanceANDFlowMaintenanceCountPage),
});
const Fun = reactive({
  // TODO
  tableRowClassName({ row, rowIndex }: { row: User; rowIndex: number }) {
    if (rowIndex === 1) {
      return "warning-row";
    } else if (rowIndex === 3) {
      return "success-row";
    }
    return "";
  },
  // TODO 获取企业列表
  async GETProcessMaintenanceANDFlowMaintenance() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETProcessMaintenanceANDFlowMaintenance", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETProcessMaintenanceANDFlowMaintenance();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETProcessMaintenanceANDFlowMaintenance();
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
      tableData = computed(() => store.state.Enterprise.countPage);
    }
  },
});
onMounted(() => {
  Fun.GETProcessMaintenanceANDFlowMaintenance();
});
</script>
