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
            <el-button type="primary" @click="Fun.GETStaff()">刷新</el-button>
          </el-empty>
        </template>
        <!--      TODO 员工编号-->
        <el-table-column align="center" :fixed="'left'" prop="LocalNumber" label="员工编号" width="190" style="text-align: center" />
        <!--   TODO ---   员工姓名-->
        <el-table-column align="center" prop="factoryMainName" label="员工姓名" width="260" />
        <!--      TODO 入职日期-->
        <el-table-column align="center" :fixed="'left'" prop="jobTime" label="入职日期" width="190" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span v-if="scope.row.jobTime">{{ scope.row.jobTime }}</span>
              <span v-else>无数据</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   所属部门-->
        <el-table-column
          align="center"
          prop="PersonLeave"
          label="所属部门"
          :fixed="'left'"
          width="120"
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
            <el-tag v-if="scope.row.PersonLeave" :type="Fun.filterTagDepartmentOfOwnership(scope.row.PersonLeave)" disable-transitions>
              {{ scope.row.PersonLeave }}
            </el-tag>
            <el-tag v-else :type="'warning'" disable-transitions> 无数据 </el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   性别-->
        <el-table-column
          align="center"
          prop="gender"
          :filters="[
            { text: '男', value: '男' },
            { text: '女', value: '女' },
            { text: '变态', value: '变态' },
          ]"
          :filter-method="Fun.filterTag"
          filter-placement="bottom-end"
          label="性别"
          width="180"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.gender" :type="Fun.GenderFilter(scope.row.gender)" disable-transitions>
              {{ scope.row.gender === "undefined" ? "未知" : scope.row.gender }}
            </el-tag>
            <el-tag v-else :type="'danger'" disable-transitions> 无数据 </el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   年龄-->
        <el-table-column align="center" prop="age" label="年龄" width="180">
          <template #default="scope">
            <span v-if="scope.row.jobTime">{{ scope.row.age }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
          </template>
        </el-table-column>
        <!--   TODO ---   电话-->
        <el-table-column align="center" prop="workstationNumber" label="电话" width="180" />
        <!--   TODO ---   地址-->
        <el-table-column align="center" prop="StaffAddress" label="地址" :formatter="Fun.formatter" width="400">
          <template #default="scope">
            <span v-if="scope.row.StaffAddress">{{ scope.row.StaffAddress }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
          </template>
        </el-table-column>
        <!--   TODO ---   邮箱-->
        <el-table-column align="center" prop="email" label="邮箱" width="180">
          <template #default="scope">
            <span v-if="scope.row.email">{{ scope.row.email }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
          </template>
        </el-table-column>
        <!--   TODO ---   身份证-->
        <el-table-column align="center" prop="idCare" label="身份证" width="260">
          <template #default="scope">
            <span v-if="scope.row.idCare">{{ scope.row.idCare }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
          </template>
        </el-table-column>
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
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.Staff.StaffLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Staff.countPage),
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
  GenderFilter(Sate: any) {
    let flag = "";
    switch (Sate) {
      case "男":
        flag = "";
        break;
      case "变态":
        flag = "warning";
        break;
      case "女":
        flag = "danger";
        break;
    }
    return flag;
  },
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.gender === value;
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
  async GETStaff() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETStaff", { index: Data.currentPage, pageSize: Data.pageSize });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.messsage}`,
        type: "error",
        center: true,
      });
    }
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
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GETStaff();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETStaff();
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
  Fun.GETStaff();
});
</script>
