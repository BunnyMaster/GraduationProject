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
        <!--      TODO 车间名称-->
        <el-table-column align="center" prop="workstationName" label="车间名称" width="auto" />
        <!--   TODO ---   所属产线-->
        <el-table-column
          align="center"
          prop="LocalName"
          label="所属产线"
          width="auto"
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
            <el-tag :type="Fun.workStationClass(scope.row.LocalName)" disable-transitions>{{ scope.row.LocalName }}</el-tag>
          </template>
        </el-table-column>
        <!--  TODO ---  车间编号  -->
        <el-table-column align="center" :fixed="'left'" prop="LocalNumber" label="车间编号" width="auto" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><OfficeBuilding /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.LocalNumber }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   车间负责人-->
        <el-table-column align="center" prop="factoryMainName" label="车间负责人" width="auto" />
        <!--   TODO ---   车间描述-->
        <el-table-column align="center" prop="factoryDtail" label="车间描述" width="auto" />
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, onMounted, reactive } from "vue";
import { Timer, OfficeBuilding } from "@element-plus/icons-vue";
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
var tableData = computed(() => store.state.Workshop.WorkshopLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Workshop.countPage),
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
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.LocalName === value;
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
  //TODO 点击编辑
  handleEdit(index, row) {},
  // TODO 点击删除
  handleDelete(index, row) {},
  //  TODO 获取工厂信息
  async GETWorkshop() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETWorkshop", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETWorkshop();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETWorkshop();
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
      tableData = computed(() => store.state.Workshop.WorkshopLsit);
    }
  },
});

onMounted(() => {
  Fun.GETWorkshop();
});
</script>
