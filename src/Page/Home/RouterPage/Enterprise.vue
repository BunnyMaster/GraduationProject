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
        <!--      TODO 单位层次-->
        <el-table-column
          align="center"
          :fixed="'left'"
          prop="EnterpriseLeave"
          label="单位层次"
          width="190"
          style="text-align: center"
          :filters="DepartmentOfOwnershipList"
          :filter-method="Fun.DepartmentOfOwnershipListfilterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.filterTagDepartmentOfOwnership(scope.row.EnterpriseLeave)" disable-transitions>{{ scope.row.EnterpriseLeave }}</el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   单位名称-->
        <el-table-column align="center" prop="CompanyName" label="单位名称" width="566" />
        <!--   TODO ---   单位性质-->
        <el-table-column align="center" prop="CompanyRegisteredCapital" label="单位性质" width="180" />
        <!--   TODO ---   企业注册资本-->
        <el-table-column align="center" prop="CompanyRegisteredCapital" label="企业注册资本" width="160">
          <template #default="scope">
            <span>{{ scope.row.CompanyRegisteredCapital }} 万元</span>
          </template>
        </el-table-column>
        <!--   TODO ---   法人-->
        <el-table-column align="center" prop="Corp" label="法人" width="120" />
        <!--   TODO ---   法人身份证-->
        <el-table-column align="center" prop="CorpIdentityCard" label="法人身份证" width="260" />
        <!--   TODO ---   单位地址-->
        <el-table-column align="center" prop="CompanyAddress" label="单位地址" width="400" />
        <!--  TODO ---  邮政编码  -->
        <el-table-column align="center" prop="PostalCode" label="邮政编码" width="150" />
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, onMounted, reactive } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
const DepartmentOfOwnershipList = [
  { text: "局级", value: "局级" },
  { text: "处级", value: "处级" },
  { text: "科级", value: "科级" },
  { text: "董事长", value: "董事长" },
  { text: "产品经理", value: "产品经理" },
];
var tableData = computed(() => store.state.Enterprise.EnterpriseLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Enterprise.countPage),
});
const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
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
  //  TODO 过滤标签
  filterTagDepartmentOfOwnership(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "局级":
        flag = "success";
        break;
      case "处级":
        flag = "warning";
        break;
      case "科级":
        flag = "danger";
        break;
      case "董事长":
        flag = "";
        break;
      case "产品经理":
        flag = "";
        break;
    }
    return flag;
  },
  // TODO 获取企业列表
  async GETEnterprise() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETEnterprise", { index: Data.currentPage, pageSize: Data.pageSize });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
  },
  // TODO 过滤所有权部门
  DepartmentOfOwnershipListfilterTag(value: string, row: User) {
    return row.EnterpriseLeave === value;
  },
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GETEnterprise();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETEnterprise();
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
  Fun.GETEnterprise();
});
</script>
