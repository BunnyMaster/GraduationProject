<template>
  <HomeTableCommon
    :tableList="tableList"
    :tableData="tableData"
    :AllPageSize="Data.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
  >
    <template #default>
      <el-table :data="tableData" style="width: 100%" stripe :row-class-name="Fun.tableRowClassName" :default-sort="{ prop: 'date', order: 'descending' }" max-height="650">
        <template #empty>
          <el-empty>
            <template #description> 暂无数据 </template>
            <el-button type="primary" @click="Fun.GetBarcodePrinter()">刷新</el-button>
          </el-empty>
        </template>
        <!--      TODO 设备条码-->
        <el-table-column align="center" :fixed="'left'" prop="BarCodeEquipment" label="设备条码" width="366" style="text-align: center; padding: 3px">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <JsBarcode v-bind="(loading = false)" :jsbarcodeInfo="scope.row.BarCodeEquipment" :text="$route.meta.title" />
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 采购时间  -->
        <el-table-column align="center" sortable="custom" prop="purchasingPeriod" label="采购时间" width="186">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.purchasingPeriod ? scope.row.purchasingPeriod.replace("T", " ").replace(".000Z", "") : "" }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   设备类型-->
        <el-table-column align="center" prop="specificationOfEquipment" label="设备类型" width="166">
          <template #default="scope">
            <span>{{ scope.row.specificationOfEquipment }}</span>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站 workStation-->
        <el-table-column
          align="center"
          prop="workStation"
          label="所属工站"
          width="188"
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
            <el-tag :type="Fun.workStationClass(scope.row.workStation)" disable-transitions>{{ scope.row.workStation }}</el-tag>
          </template>
        </el-table-column>
        <!--    TODO ---  所属工位-->
        <el-table-column align="center" prop="SubordinateStation" label="所属工位" width="188">
          <template #default="scope">
            <span>{{ scope.row.SubordinateStation }}</span>
          </template>
        </el-table-column>
        <!--  TODO --- 所有权部门   -->
        <el-table-column align="center" prop="DepartmentOfOwnership" label="所有权部门" width="188">
          <template #default="scope">
            <span>{{ scope.row.DepartmentOfOwnership }}</span>
          </template>
        </el-table-column>
        <!--   TODO ---   生产商-->
        <el-table-column align="center" prop="manufacturing" label="生产商" width="466" />
        <!--  TODO --- 用途   -->
        <el-table-column align="center" prop="USEfor" label="用途" width="266" />
        <!--  TODO --- 资产负责人   -->
        <el-table-column align="center" prop="PrincipalOfAssets" label="资产负责人" width="120" />
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
      <el-form-item label="设备条码" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.BarCodeEquipment" placeholder="请输入设备条码" style="width: 300px" />
      </el-form-item>
      <!--      设备条码-->
      <el-form-item label="采购时间" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker v-model="form.name.purchasingPeriod" type="datetime" placeholder="请输入采购时间" />
        </div>
      </el-form-item>
      <!--      设备类型-->
      <el-form-item label="设备类型" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.specificationOfEquipment" placeholder="请输入设备类型">
          <el-option v-for="(LabelItem, LableIndex) in form.MenuBarList.DevicTtype" :key="LableIndex" :label="LabelItem" :value="LabelItem" />
        </el-select>
      </el-form-item>
      <!--      所属工站-->
      <el-form-item label="所属工站" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.workStation" placeholder="请输入所属工站" style="width: 300px" />
      </el-form-item>
      <!--      所属工位-->
      <el-form-item label="所属工位" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.SubordinateStation" placeholder="请输入所属工位" style="width: 300px" />
      </el-form-item>
      <!--      分辨率-->
      <el-form-item label="所有权部门" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.DepartmentOfOwnership" placeholder="请输入所有权部门" style="width: 300px" />
      </el-form-item>
      <!--      核心数-->
      <el-form-item label="生产商" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.manufacturing" placeholder="请输入生产商" style="width: 300px" />
      </el-form-item>
      <!--      内存-->
      <el-form-item label="用途" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.USEfor" placeholder="请输入用途" style="width: 300px" />
      </el-form-item>
      <el-form-item label="资产负责人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.PrincipalOfAssets" placeholder="请输入资产负责人" style="width: 300px" />
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
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import JsBarcode from "@/components/JsBarcode.vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { Timer, Plus, Search, Delete, Platform } from "@element-plus/icons-vue";
import * as uuid from "uuid";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "采购时间", "创建时间", "所属工站", "所属工位", "所有权部门", "称量范围", "供应商", "生产商", "资产负责人"];
const loading = ref(true);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.BarcodePrinter.countPage),
});
var tableData = computed(() => store.state.BarcodePrinter.BarcodePrinterLsit);
const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
  },
  // TODO 所属工站
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
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.tag === value;
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
  //  TODO 获取打印机列表
  async GetBarcodePrinter() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GetBarcodePrinter", { index: Data.currentPage, pageSize: Data.pageSize });
      await store.dispatch("GetDevicTtypeList");
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
    Fun.GetBarcodePrinter();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GetBarcodePrinter();
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
      await store.dispatch("BarcodePrinterDelete", { id: row.id });
      Fun.GetBarcodePrinter();
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
    let change: string = dayjs(data.purchasingPeriod).format("YYYY-MM-DD HH:mm:ss");
    data.purchasingPeriod = change;
    try {
      await store.dispatch("BarcodePrinterSearchAddItem", data);
      Fun.GetBarcodePrinter();
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
});
var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    BarCodeEquipment: "",
    purchasingPeriod: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    specificationOfEquipment: "",
    workStation: "",
    SubordinateStation: "",
    DepartmentOfOwnership: "",
    manufacturing: undefined,
    USEfor: "",
    PrincipalOfAssets: "",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
  currentPage: 0, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.AndroidPAD.CountPage),
  tableData: computed(() => store.state.AndroidPAD.AllTableList),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("BarcodePrinterSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GetBarcodePrinter();
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
  Fun.GetBarcodePrinter();
  watch(
    () => computed(() => store.state.BarcodePrinter.countPage),
    () => (tableData = store.state.BarcodePrinter.BarcodePrinterLsit),
    { deep: true },
  );
});
</script>
