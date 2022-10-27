<template>
  <HomeTableCommon
    :tableData="tableData"
    :tableList="tableList"
    :AllPageSize="Data.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
  >
    <template #default>
      <el-table :data="tableData" style="width: 100%" stripe :row-class-name="Fun.tableRowClassName" :default-sort="{ prop: 'date', order: 'descending' }" max-height="650">
        <template #empty>
          <el-empty>
            <template #description> 暂无数据 </template>
            <el-button type="primary">刷新</el-button>
          </el-empty>
        </template>
        <!--      TODO 设备编号-->
        <el-table-column align="center" :fixed="'left'" prop="id" sortable="custom" label="设备编号" width="136" />
        <!--   TODO --- 设备类型  -->
        <el-table-column align="center" :fixed="'left'" sortable="custom" prop="WorkShopNumber" label="设备类型" width="150">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon :size="16"><Platform /></el-icon>
              <span style="margin-left: 10px" v-if="scope.row.WorkShopNumber">{{ scope.row.WorkShopNumber }}</span>
              <span style="margin-left: 10px; color: #f56c6c" v-else>用户未填写</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 所处位置-->
        <el-table-column align="center" prop="Address" label="所处位置" width="266" />
        <!--      TODO 故障描述-->
        <el-table-column align="center" prop="detail" label="故障描述" width="566" style="text-align: center">
          <template #default="scope">
            <span v-if="scope.row.detail">{{ scope.row.detail }}</span>
            <span v-else style="color: #f56c6c">{{ "用户未填写" }}</span>
          </template>
        </el-table-column>
        <!--      TODO 上报人姓名-->
        <el-table-column align="center" prop="Name" label="上报人姓名" width="166" style="text-align: center" />
        <!--   TODO --- 上报时间  -->
        <el-table-column align="center" sortable="custom" prop="Time" label="上报时间" width="266" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.Time }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 问题状态-->
        <el-table-column prop="State" label="问题状态" width="auto" align="center">
          <template #default="scope">
            <el-tag :type="Fun.RepairSate(scope.row.State)" disable-transitions="disable-transitions">
              {{ scope.row.State }}
            </el-tag>
          </template>
        </el-table-column>
        <!--      TODO 是否已派工-->
        <el-table-column prop="IsDispatch" label="是否已派工" width="166" align="center">
          <template #default="scope">
            <el-tag :type="Fun.IsDispatch(scope.row.IsDispatch)" disable-transitions="disable-transitions">
              {{ scope.row.IsDispatch }}
            </el-tag>
          </template>
        </el-table-column>
        <!--  TODO --- 操作   -->
        <el-table-column align="center" :fixed="'right'" label="操作" width="190">
          <template #default="scope">
            <el-button size="small" @click="Fun.handleEdit(scope.$index, scope.row)" v-if="scope.row.IsDispatch === '未派工'" type="warning"> 修改已派工 </el-button>
            <el-button size="small" v-else type="success" disabled>已经派工啦 </el-button>
            <el-button size="small" type="danger" @click="Fun.handleDelete(scope.$index, scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, onMounted, reactive } from "vue";
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
var tableData = computed(() => store.state.RepairCord.RepairCordLIst);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.RepairCord.CountPage),
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
  async GetRepairBill() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GetRepairCordList", { index: Data.currentPage, pageSize: Data.pageSize });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
  },
  //   TODO 未修状态
  RepairSate(state: string) {
    let flag = "";
    let warning = 0;
    let success = 0;
    let exception = 0;

    switch (state) {
      case "完成":
        flag = "success";
        success++;
        break;
      case "警告":
        flag = "warning";
        warning++;
        break;
      case "错误":
        flag = "danger";
        exception++;
        break;
      case "未修":
        flag = "";
        break;
    }
    return flag;
  },
  // TODO 是否已派工
  IsDispatch(state: string) {
    let flag = "";
    switch (state) {
      case "已派工":
        flag = "success";
        break;
      case "未派工":
        flag = "warning";
        break;
    }
    return flag;
  },
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GetRepairBill();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GetRepairBill();
  },
  // TODO 修改已派工
  async handleEdit(index: number, row: any) {
    ElMessage.closeAll();
    try {
      await store.dispatch("handleEditDsipach", { index: row.id });
      Fun.GetRepairBill();
      ElMessage({
        showClose: true,
        message: `修改状态成功`,
        type: "success",
        center: true,
      });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
  },
  //  TODO 删除工单信息
  async handleDelete(index: number, row: any) {
    ElMessage.closeAll();
    try {
      await store.dispatch("DeleteRepairDispach", { index: row.id });
      Fun.GetRepairBill();
      ElMessage({
        showClose: true,
        message: `删除订单成功`,
        type: "success",
        center: true,
      });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
  },
});

onMounted(() => {
  Fun.GetRepairBill();
});
</script>
