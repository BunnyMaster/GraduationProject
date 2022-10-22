<template>
  <HomeTableCommon
    :tableData="tableData"
    :tableList="tableList"
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
        <el-table-column align="center" :fixed="'left'" prop="id" label="序号" width="116">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!--   TODO --- 编号  -->
        <el-table-column align="center" sortable prop="EquipmentLedgerNum" label="编号" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><Discount /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.EquipmentLedgerNum }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 设备类型-->
        <el-table-column align="center" prop="EquipmentType" label="设备类型" width="166" />
        <!--      TODO 设备规格-->
        <el-table-column align="center" prop="EquipmentEPEC" label="设备规格" width="260" />
        <!--      TODO 供应商-->
        <el-table-column align="center" prop="Provider" label="供应商" width="400" />
        <!--      TODO 出厂编号-->
        <el-table-column align="center" prop="SubPerson" label="上报人" width="166" />
        <!--      TODO 用途-->
        <el-table-column align="center" prop="ToUse" label="用途" width="出厂编号" />
        <!--   TODO --- 采购日期  -->
        <el-table-column align="center" sortable prop="ImportanTime" label="采购日期" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.ImportanTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 资产负责人-->
        <el-table-column align="center" prop="principal" label="资产负责人" width="150" />
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, onMounted, reactive } from "vue";
import { Discount, Timer } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { fromPairs } from "lodash";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.RepairCord.equipmentledgerLIst);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.RepairCord.equipmentledgerCountPage),
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
  async GETequipmentledger() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETequipmentledger", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETequipmentledger();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETequipmentledger();
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
      tableData = computed(() => store.state.RepairCord.equipmentledgerLIst);
    }
  },
});

onMounted(() => {
  Fun.GETequipmentledger();
});
</script>
