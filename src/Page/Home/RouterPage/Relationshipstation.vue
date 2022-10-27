<template>
  <HomeTableCommon
    :tableList="tableList"
    :tableData="tableData"
    :AllPageSize="Data.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
  >
    <!--    TODO Search_Add 头部添加-->
    <template #Search_Add>
      <el-button type="success" :icon="Delete" class="My-Search-Btn" style="margin-right: 10px">批量删除</el-button>
    </template>
    <!--    默认添加-->
    <template #default>
      <el-table :data="tableData" style="width: 100%" stripe :row-class-name="Fun.tableRowClassName" :default-sort="{ prop: 'date', order: 'descending' }" max-height="650">
        <template #empty>
          <el-empty>
            <template #description> 暂无数据 </template>
            <el-button type="primary" @click="Fun.GETPerformance()">刷新</el-button>
          </el-empty>
        </template>
        <!--   TODO ---   产线名称 LocalName-->
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
        <!--   TODO ---   状态 Sate-->
        <el-table-column
          align="center"
          :fixed="'left'"
          prop="Sate"
          label="状态"
          width="180"
          :filters="[
            { text: '在线', value: '在线' },
            { text: '下班', value: '下班' },
            { text: '公出', value: '公出' },
            { text: '请假', value: '请假' },
          ]"
          :filter-method="Fun.filterTagSate"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.StateClass(scope.row.Sate)" disable-transitions>{{ scope.row.Sate }}</el-tag>
          </template>
        </el-table-column>
        <!--      TODO 人员简述-->
        <el-table-column align="center" prop="factoryDtail" label="人员简述" width="288" />
        <!--      TODO 首件检测-->
        <el-table-column align="center" prop="factoryMainName" label="首件检测" width="188">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center" v-if="scope.row.factoryMainName">
              <el-icon><UserFilled /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.factoryMainName }}</span>
            </div>
            <span style="color: #f56c6c" v-else>暂无数据</span>
          </template>
        </el-table-column>
        <!--   TODO ---   条码-->
        <el-table-column align="center" prop="LocalNumber" label="条码" width="366">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <JsBarcode :jsbarcodeInfo="scope.row.LocalNumber" :text="$route.meta.title" />
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   绩效参数名称-->
        <el-table-column align="center" prop="ConfigName" label="绩效参数名称" width="400" />
        <!--   TODO ---   单位-->
        <el-table-column align="center" prop="Unit" label="单位" width="188" />
        <!--   TODO ---   所属工站 -->
        <el-table-column align="center" prop="workstationName" label="所属工站" width="188" />
        <!--   TODO ---   属性-->
        <el-table-column align="center" prop="workName" label="等级" width="166" />
      </el-table>
    </template>
    <template #Search_Add_Before>
      <el-input v-model="Search_Add.input" placeholder="请输入首件检测" @keyup.enter="Search_Add.GoSearch" />
      <el-button class="My-Search-Btn" type="success" :icon="Search" @click="Search_Add.GoSearch">搜索</el-button>
    </template>
  </HomeTableCommon>
</template>

<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import JsBarcode from "@/components/JsBarcode.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Timer, Plus, Search, Delete, Platform } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

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
const tableData = computed(() => store.state.Performance.GETPerformanceList);

const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Performance.GETPerformanceCountPage),
});
const Fun = reactive({
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.LocalName === value;
  },
  // TODO 过滤在线状态
  filterTagSate(value: string, row: User) {
    return row.Sate === value;
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
  cancel() {
    ElMessage.closeAll();
    ElMessage({
      showClose: true,
      message: `取消删除`,
      type: "warning",
      center: true,
    });
  },
  // TODO 点击删除
  async handleDelete(index: number, row: any) {
    ElMessage.closeAll();
    try {
      let result = await store.dispatch("ElectronicScaleDelete", { id: row.id });
      ElMessage({
        showClose: true,
        message: `${result}`,
        type: "success",
        center: true,
      });
      Fun.GETPerformance();
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
  // TODO 提交表单
  async SubmitName() {
    ElMessage.closeAll();
    let data: any = form.name;
    let change: string = dayjs(data.purchasingPeriod).format("YYYY-MM-DD HH:mm:ss");
    data.purchasingPeriod = change;
    try {
      await store.dispatch("ElectronicScaleAddItem", data);
      Fun.GETPerformance();
      ElMessage({
        showClose: true,
        message: `添加成功`,
        type: "success",
        center: true,
      });
      dialogFormVisible.value = false;
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `错误${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
  // TODO GET 派发 电子秤GET请求
  async GETPerformance() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETPerformance", { index: Data.currentPage, pageSize: Data.pageSize });
      await store.dispatch("GetDevicTtypeList");
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "error",
        center: true,
      });
    }
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
    return row.PrincipalOfAssets === value;
  },
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GETPerformance();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETPerformance();
  },
});

var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    BarCodeEquipment: "electronicscale-8a4463319bb9",
    ScaleName: "电子秤",
    specificationOfEquipment: "台秤",
    workStation: "马哈鱼生产线",
    SubordinateStation: "21号位",
    purchasingPeriod: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    WeighingScale: "0~21",
    weight: 21,
    manufacturer: "电子秤",
    supplier: "深圳市瑞鸿鑫贸易有限公司",
    manufacturing: "行政办公室",
    USEFor: "水果批发",
    PrincipalOfAssets: "ElectronicScale-8a4463319bb9",
    DepartmentOfOwnership: "酆晨涛",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("GETPerformanceSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETPerformance();
    }
  },
  //  TODO 添加数据
  AddItem(flag: boolean) {
    dialogFormVisible.value = flag;
    if (dialogFormVisible.value) {
      ElMessage.closeAll();
      ElMessage({
        showClose: true,
        message: "请求修改所需内容",
        type: "success",
        center: true,
      });
    }
  },
});

onMounted(() => {
  Fun.GETPerformance();
});
</script>
