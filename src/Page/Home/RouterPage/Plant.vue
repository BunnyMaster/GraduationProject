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
        <!--      TODO 工厂名称-->
        <el-table-column align="center" prop="factoryAdress" label="工厂名称" width="466" />
        <!--   TODO ---   所属企业-->
        <el-table-column align="center" prop="CompanyName" label="所属企业" width="466" />
        <!--   TODO ---   所属企业法人-->
        <el-table-column align="center" prop="Corp" label="所属企业法人" width="366" />
        <!--  TODO ---  创建日期  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="CreateTime" label="创建日期" width="266" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.CreateTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   建筑面积-->
        <el-table-column align="center" :fixed="'left'" sortable prop="StructureArea" label="建筑面积" width="130" style="text-align: center" />
        <!--   TODO ---   工厂地址-->
        <el-table-column align="center" prop="factoryName" label="工厂地址" width="166" />
        <!--   TODO ---   工厂电话-->
        <el-table-column align="center" prop="factoryPhone" label="工厂电话" width="188" />
        <!--  TODO ---  邮政编码  -->
        <el-table-column align="center" prop="PostalCode" label="邮政编码" width="266" />
        <!--  TODO --- 操作   -->
        <el-table-column align="center" fixed="right" label="操作" width="190">
          <template #default="scope">
            <el-button size="small" @click="Fun.handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
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
import { Timer } from "@element-plus/icons-vue";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.Factory.FactoryLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Factory.countPage),
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
  //TODO 点击编辑
  handleEdit(index, row) {},
  // TODO 点击删除
  handleDelete(index, row) {},

  async GETFactory() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETFactory", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETFactory();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETFactory();
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
  Fun.GETFactory();
});
</script>
