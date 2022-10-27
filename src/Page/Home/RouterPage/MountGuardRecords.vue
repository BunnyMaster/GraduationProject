<template>
  <HomeTableCommon
    :tableList="tableList"
    :tableData="Data.MountGuardRecordsLsit"
    :AllPageSize="Data.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
    @ChangeTableData="Fun.ChangeTableData"
  >
    <template #default>
      <el-table
        :data="Data.MountGuardRecordsLsit"
        style="width: 100%"
        stripe
        :row-class-name="Fun.tableRowClassName"
        :default-sort="{ prop: 'date', order: 'descending' }"
        max-height="650"
      >
        <template #empty>
          <el-empty>
            <template #description> 暂无数据 </template>
            <el-button type="primary" @click="Fun.MountGuardRecordsLsit()">刷新</el-button>
          </el-empty>
        </template>
        <!--   TODO --- 序号  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="id" label="序号" width="88" style="text-align: center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!--   TODO ---   员工工号-->
        <el-table-column align="center" prop="LocalNumber" label="员工工号" width="260">
          <template #default="scope">
            <span v-if="scope.row.LocalNumber">{{ scope.row.LocalNumber }}</span>
            <span v-else style="color: #f56c6c">暂无数据</span>
          </template>
        </el-table-column>
        <!--      TODO 员工姓名-->
        <el-table-column align="center" prop="factoryMainName" label="员工姓名" width="166" />
        <!--      TODO 年龄-->
        <el-table-column align="center" prop="age" label="年龄" width="166">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span style="margin-left: 10px; color: #f56c6c" v-if="!scope.row.age">暂无数据</span>
              <span style="margin-left: 10px" v-else>{{ scope.row.age }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 性别-->
        <el-table-column
          align="center"
          prop="gender"
          label="性别"
          width="166"
          :filters="[
            { text: '男', value: '男' },
            { text: '女', value: '女' },
            { text: '暂无数据', value: '暂无数据' },
          ]"
          :filter-method="Fun.filterTaggender"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.GenderClass(scope.row.gender)" disable-transitions v-if="scope.row.gender">{{ scope.row.gender }}</el-tag>
            <el-tag :type="Fun.GenderClass('暂无数据')" disable-transitions v-else>暂无数据</el-tag>
          </template>
        </el-table-column>
        <!--      TODO 邮箱-->
        <el-table-column align="center" prop="email" label="邮箱" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span style="margin-left: 10px; color: #f56c6c" v-if="!scope.row.email">暂无数据</span>
              <span style="margin-left: 10px" v-else>{{ scope.row.email }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 身份证号-->
        <el-table-column align="center" prop="idCare" label="身份证号" width="166">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span style="margin-left: 10px; color: #f56c6c" v-if="!scope.row.idCare">暂无数据</span>
              <span style="margin-left: 10px" v-else>{{ scope.row.idCare }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 职务信息-->
        <el-table-column align="center" prop="workName" label="职务信息" width="166">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span style="margin-left: 10px; color: #f56c6c" v-if="!scope.row.workName">暂无数据</span>
              <span style="margin-left: 10px" v-else>{{ scope.row.workName }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 主要职务信息-->
        <el-table-column align="center" prop="factoryDtail" label="主要职务信息" width="466">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span style="margin-left: 10px; color: #f56c6c" v-if="!scope.row.factoryDtail">暂无数据</span>
              <span style="margin-left: 10px" v-else>{{ scope.row.factoryDtail }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站-->
        <el-table-column align="center" prop="workstationName" label="所属工站" width="120" />
        <!--   TODO ---   产线名称-->
        <el-table-column
          align="center"
          prop="LocalName"
          label="产线名称"
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
            <el-tag :type="Fun.workStationClass(scope.row.LocalName)" disable-transitions>{{ scope.row.LocalName }}</el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   上班-->
        <el-table-column sortable align="center" prop="jobTime" label="上班" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px; color: #f56c6c" v-if="!scope.row.jobTime">无数据</span>
              <span style="margin-left: 10px" v-else>{{ scope.row.jobTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   下班-->
        <el-table-column sortable align="center" prop="OffDutyTime" label="下班" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px; color: #f56c6c" v-if="!scope.row.OffDutyTime">无数据</span>
              <span style="margin-left: 10px" v-else>{{ scope.row.OffDutyTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   工作状态-->
        <el-table-column
          align="center"
          :fixed="'right'"
          prop="Sate"
          :filters="[
            { text: '在线', value: '在线' },
            { text: '下班', value: '下班' },
            { text: '公出', value: '公出' },
            { text: '请假', value: '请假' },
          ]"
          :filter-method="Fun.filterTagSate"
          filter-placement="bottom-end"
          label="工作状态"
          width="180"
        >
          <template #default="scope">
            <el-tag :type="Fun.StateClass(scope.row.Sate)" disable-transitions v-if="scope.row.Sate">{{ scope.row.Sate }}</el-tag>
            <el-tag :type="Fun.StateClass(scope.row.Sate)" disable-transitions v-else>暂无数据</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import dayjs from "dayjs";
import { useStore } from "vuex";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "名称", "称量范围", "重量", "供应商", "生产商", "出厂编号", "用途", "资产负责人", "所有权部门"];
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  MountGuardRecordsLsit: computed(() => store.state.Staff.MountGuardRecordsLsit),
  AllPageSize: computed(() => store.state.Staff.MountGuardRecordsCountPage),
});
const Fun = reactive({
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.LocalName === value;
  },
  // TODO  过滤性别
  filterTaggender(value: string, row: User) {
    return row.gender === value;
  },
  // TODO 过滤在线状态
  filterTagSate(value: string, row: User) {
    return row.Sate === value;
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
  //  TODO 过滤性别
  GenderClass(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "男":
        flag = "success";
        break;
      case "女":
        flag = "warning";
        break;
      case "暂无数据":
        flag = "danger";
        break;
      case "":
        flag = "danger";
        break;
    }
    return flag;
  },
  // TODO 过滤在线状态
  StateClass(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "在线":
        flag = "success";
        break;
      case "下班":
        flag = "warning";
        break;
      case "公出":
        flag = "danger";
        break;
      case "请假":
        flag = "";
        break;
    }
    return flag;
  },
  //TODO 点击编辑
  handleEdit(index, row) {},
  // TODO 点击删除
  handleDelete(index, row: string) {
    row.split("、");
  },
  // TODO GET 派发 电子秤GET请求
  async GETMountGuardRecords() {
    store.dispatch("GETMountGuardRecords", { index: Data.currentPage, pageSize: Data.pageSize });
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
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GETMountGuardRecords();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETMountGuardRecords();
  },
  // TODO 改变数组ChangeTableData
  ChangeTableData(Val: string) {
    let list: string[] = [];
    if (Val) {
      Data.MountGuardRecordsLsit.forEach((Name: any) => {
        if (Name.manufacturer.toString() === Val.toString()) list.push(Name);
      });
      Data.MountGuardRecordsLsit = computed(() => list);
    } else {
      Data.MountGuardRecordsLsit = computed(() => store.state.state.MountGuardRecordsLsit);
    }
  },
});

onMounted(() => {
  Fun.GETMountGuardRecords();
});
</script>
