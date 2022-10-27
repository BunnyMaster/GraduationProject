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
            <el-button type="primary" @click="Fun.GETPerformanceConfig()">刷新</el-button>
          </el-empty>
        </template>
        <!--   TODO ---   绩效参数名称-->
        <el-table-column align="center" prop="ConfigName" label="绩效参数名称" width="auto" />
        <!--   TODO ---   单价-->
        <el-table-column align="center" prop="Price" label="单价" width="auto">
          <template #default="scope">
            <el-icon><Coin /></el-icon>
            <span>{{ scope.row.Price }} 万元</span>
          </template>
        </el-table-column>
        <!--   TODO ---   单位-->
        <el-table-column align="center" prop="Unit" label="单位" width="auto" />
        <!--  TODO --- 操作   -->
        <el-table-column align="center" fixed="right" label="操作" width="166">
          <template #default="scope">
            <el-popconfirm
              title="确定要删除吗？"
              confirm-button-text="删除"
              cancel-button-text="不删除"
              :icon="Delete"
              icon-color="#F56C6C"
              @confirm="Fun.handleDelete(scope.$index, scope.row)"
              @cancel="Fun.cancel()"
            >
              <template #reference>
                <el-button type="danger" plain :icon="Delete" size="large"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #Search_Add_Before>
      <el-input v-model="Search_Add.input" placeholder="请输入搜索资产负责人" @keyup.enter="Search_Add.GoSearch" />
      <el-button class="My-Search-Btn" type="success" :icon="Search" @click="Search_Add.GoSearch">搜索</el-button>
    </template>
    <template #Search_Add_After>
      <el-button class="My-Search-Btn" type="success" :icon="Plus" @click="Search_Add.AddItem(true)">添加</el-button>
    </template>
  </HomeTableCommon>
  <!--  对话框-->
  <el-dialog v-model="dialogFormVisible" :title="`${$route.meta.title}`" draggable="draggable">
    <el-form :model="form">
      <h1 style="text-align: center; margin-bottom: 16px">请添请加</h1>
      <!--          TODO 选择框中的设备列表-->
      <el-form-item label="连接编号" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.performanceNo" placeholder="请输入连接编号" style="width: 300px" />
      </el-form-item>
      <el-form-item label="配置名" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.ConfigName" placeholder="请输入配置名" style="width: 300px" />
      </el-form-item>
      <el-form-item label="价格" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Price" placeholder="请输入价格" style="width: 300px" />
      </el-form-item>
      <el-form-item label="单位" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Unit" placeholder="请输入单位" style="width: 300px" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="Fun.SubmitName()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
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
const tableData = computed(() => store.state.Performance.PerformanceConfigList);

const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Performance.PerformanceConfigCountPage),
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
      await store.dispatch("PerformanceConfigDelete", { id: row.id });
      Fun.GETPerformanceConfig();
      ElMessage({
        showClose: true,
        message: `删除成功`,
        type: "success",
        center: true,
      });
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
    try {
      await store.dispatch("PerformanceConfigAddItem", data);
      Fun.GETPerformanceConfig();
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
  // TODO GET 派发请求
  async GETPerformanceConfig() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETPerformanceConfig", { index: Data.currentPage, pageSize: Data.pageSize });
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
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GETPerformanceConfig();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETPerformanceConfig();
  },
});

var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    performanceNo: "38",
    ConfigName: "一视同仁",
    Price: "8",
    Unit: "数据分析师",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("GETPerformanceConfigSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETPerformanceConfig();
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
  Fun.GETPerformanceConfig();
});
</script>
