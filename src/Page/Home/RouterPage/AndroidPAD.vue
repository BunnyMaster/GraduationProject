<template>
  <!--  项目名-->
  <HomeTableCommon
    :tableList="tableList"
    :tableData="form.tableData"
    :AllPageSize="form.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
  >
    <template #default>
      <el-table
        v-bind="$route.meta.title ? (loading = false) : (loading = true)"
        :data="form.tableData"
        style="width: 100%"
        stripe
        :row-class-name="Fun.tableRowClassName"
        :default-sort="{ prop: 'date', order: 'descending' }"
        max-height="650"
      >
        <template #empty>
          <el-empty>
            <template #description> 暂无数据</template>
            <el-button type="primary" @click="Fun.Refshash()">刷新</el-button>
          </el-empty>
        </template>
        <!--    TODO fixed---固定一端 fixed="right"---固定选择的一端-->

        <!--      TODO 设备条码-->
        <el-table-column align="center" :fixed="'left'" prop="date" label="设备条码" width="366" style="text-align: center; padding: 3px">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <JsBarcode :jsbarcodeInfo="scope.row.BarCodeEquipment" :text="$route.meta.title" />
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 设备规格  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="DeviceType" label="设备规格" width="200" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon>
                <Iphone />
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.DeviceType }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO --- 采购时间-->
        <el-table-column align="center" :fixed="'left'" sortable prop="purchasingPeriod" label="采购时间" width="286" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px" v-if="scope.row.purchasingPeriod">{{
                scope.row.purchasingPeriod.replace("T", "\t").replace(".000Z", "").replace(".000000", "")
              }}</span>
              <span style="margin-left: 10px; color: #f56c6c" v-else>暂无数据</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站-->
        <el-table-column align="center" prop="workStation" label="所属工站" width="100" :filters="fileter" :filter-method="Fun.filterTag" filter-placement="bottom-end">
          <template #default="scope">
            <el-tag :type="scope.row.workStation === '金枪鱼生产线' ? '' : 'success'" disable-transitions>
              {{ scope.row.workStation }}
            </el-tag>
          </template>
        </el-table-column>
        <!--    TODO ---  所属工位-->
        <el-table-column
          align="center"
          prop="tag"
          label="所属工位"
          width="100"
          :filters="fileterSubordinateStation"
          :filter-method="Fun.SubordinateStation"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.SubordinateStation === '1号位' ? '' : 'success'" disable-transitions>
              {{ scope.row.SubordinateStation }}
            </el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   分辨率-->
        <el-table-column align="center" prop="resolutionRatio" label="分辨率" width="200">
          <template #default="scope">
            <span style="margin-left: 10px"> {{ scope.row.resolutionRatio.replace("*", "×") }} 像素</span>
          </template>
        </el-table-column>
        <!--  TODO --- 核心数   -->
        <el-table-column align="center" prop="coreNumber" label="核心数" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">内核:{{ scope.row.coreNumber }}</span>
          </template>
        </el-table-column>
        <!--   TODO --- 内存  -->
        <el-table-column align="center" prop="memory" label="内存" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">内存:{{ scope.row.memory }}</span>
          </template>
        </el-table-column>
        <!--  TODO --- 电池容量   -->
        <el-table-column align="center" prop="batteryCapacity" label="电池容量" width="180" 电池容量>
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.batteryCapacity }} 毫安</span>
          </template>
        </el-table-column>
        <!-- TODO ---  供应商   -->
        <el-table-column align="center" prop="supplier" label="供应商" width="100" />
        <!--  TODO ---  生产商  -->
        <el-table-column align="center" prop="manufacturer" label="生产商" width="350" />
        <!--   TODO ---   用途-->
        <el-table-column align="center" prop="PrincipalOfAssets" label="用途" :formatter="Fun.formatter" width="400">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.PrincipalOfAssets }}---{{ scope.row.workStation }}</span>
          </template>
        </el-table-column>
        <!--  TODO --- 资产负责人   -->
        <el-table-column align="center" prop="PrincipalOfAssets" label="资产负责人" width="120" />
        <!--  TODO --- 所有权部门   -->
        <el-table-column
          align="center"
          prop="DepartmentOfOwnership"
          label="所有权部门"
          width="150"
          :filters="DepartmentOfOwnershipList"
          :filter-method="Fun.DepartmentOfOwnershipListfilterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.DepartmentOfOwnership === ('生产技术' || '技术部') ? '' : 'success'" disable-transitions>
              {{ scope.row.DepartmentOfOwnership }}
            </el-tag>
          </template>
        </el-table-column>
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
      <el-input v-model="Search_Add.input" placeholder="搜索资产负责人" @keyup.enter="Search_Add.GoSearch" />
      <el-button class="My-Search-Btn" type="success" :icon="Search" @click="Search_Add.GoSearch">搜索</el-button>
    </template>
    <template #Search_Add_After>
      <el-button class="My-Search-Btn" type="success" :icon="Plus" @click="Fun.AddItem((flag = true))">添加</el-button>
    </template>
  </HomeTableCommon>
  <!--  对话框-->
  <el-dialog v-model="dialogFormVisible" :title="`${$route.meta.title}`">
    <el-form :model="form">
      <h1 style="text-align: center; margin-bottom: 16px">请添请加</h1>
      <!--          TODO 选择框中的设备列表-->
      <el-form-item label="设备列表" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.specificationOfEquipment" placeholder="请选择设备">
          <el-option v-for="(LabelItem, LableIndex) in form.MenuBarList.DevicTtype" :key="LableIndex" :label="LabelItem" :value="LabelItem" />
        </el-select>
      </el-form-item>
      <!--      设备条码-->
      <el-form-item label="设备条码" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.BarCodeEquipment" placeholder="请输入条码编号" style="width: 300px" />
      </el-form-item>
      <!--      设备规格-->
      <el-form-item label="设备规格" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.DeviceType" placeholder="请输入设备规格" style="width: 300px" />
      </el-form-item>
      <!--      采购时间-->
      <el-form-item label="采购时间" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker v-model="form.name.purchasingPeriod" type="datetime" placeholder="请选择日期与时间" />
        </div>
        <!--        <el-input v-model="form.name.purchasingPeriod" placeholder="请输入采购时间" style="width: 300px" />-->
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
      <el-form-item label="分辨率" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.resolutionRatio" placeholder="请输入分辨率" style="width: 300px" />
      </el-form-item>
      <!--      核心数-->
      <el-form-item label="核心数" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.coreNumber" placeholder="请输入核心数" style="width: 300px" />
      </el-form-item>
      <!--      内存-->
      <el-form-item label="内存" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.memory" placeholder="请输入内存容量" style="width: 300px" />
      </el-form-item>
      <el-form-item label="电池容量" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.batteryCapacity" placeholder="请输入电池容量" style="width: 300px" />
      </el-form-item>
      <el-form-item label="生产商" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.supplier" placeholder="请输入生产商" style="width: 300px" />
      </el-form-item>
      <el-form-item label="用途" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.manufacturer" placeholder="请输入用途" style="width: 300px" />
      </el-form-item>
      <el-form-item label="资产负责人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.PrincipalOfAssets" placeholder="请输入资产负责人" style="width: 300px" />
      </el-form-item>
      <el-form-item label="所有权部门" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.DepartmentOfOwnership" placeholder="请输入所有权部门" style="width: 300px" />
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
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { Timer, Iphone, Plus, Search, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import * as uuid from "uuid";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import JsBarcode from "@/components/JsBarcode.vue";
import { useStore } from "vuex";
import dayjs from "dayjs";

interface User {
  BarCodeEquipment: string;
  DepartmentOfOwnership: string;
  DeviceType: string;
  PrincipalOfAssets: string;
  SubordinateStation: string;
  batteryCapacity: number;
  coreNumber: number;
  id: string;
  id_index: number;
  manufacturer: string;
  memory: number;
  purchasingPeriod: string;
  resolutionRatio: string;
  specificationOfEquipment: string;
  supplier: string;
  workStation: string;
}

// 生产线
const fileter = [
  { text: "金龙鱼生产线", value: "金龙鱼生产线" },
  { text: "鱿鱼丝生产线", value: "鱿鱼丝生产线" },
  { text: "金枪鱼生产线", value: "金枪鱼生产线" },
  { text: "马哈鱼生产线", value: "马哈鱼生产线" },
];
// 所属工位
const fileterSubordinateStation = [];
// 所有权部门
const DepartmentOfOwnershipList = [
  { text: "行政办公室", value: "行政办公室" },
  { text: "人力资源部", value: "人力资源部" },
  { text: "财务部", value: "财务部" },
  { text: "生产技术部", value: "生产技术部" },
  { text: "计划营销部", value: "计划营销部" },
  { text: "安全监察部", value: "安全监察部" },
  { text: "技术部", value: "技术部" },
];
const store = useStore();
const tableList = [
  "设备条码",
  "设备规格",
  "采购时间",
  "所属工站",
  "所属工位",
  "分辨率",
  "分辨率",
  "核心数",
  "内存",
  "电池容量",
  "供应商",
  "生产商",
  "用途",
  "资产负责人",
  "所有权部门",
];
const loading = ref(true);
var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    id: uuid.v4(),
    BarCodeEquipment: "",
    specificationOfEquipment: "",
    purchasingPeriod: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    DeviceType: "",
    workStation: "",
    SubordinateStation: "",
    resolutionRatio: "",
    coreNumber: "",
    batteryCapacity: "",
    supplier: "",
    memory: "",
    PrincipalOfAssets: "",
    manufacturer: "",
    DepartmentOfOwnership: "",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
  currentPage: 0, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.AndroidPAD.CountPage),
  tableData: computed(() => store.state.AndroidPAD.AllTableList),
});

const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
  },
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.workStation === value;
  },
  // TODO 过滤所有权部门
  DepartmentOfOwnershipListfilterTag(value: string, row: User) {
    return row.DepartmentOfOwnership === value;
  },
  //TODO 过滤所属工位 SubordinateStation
  SubordinateStation(value: string, row: User) {
    return row.SubordinateStation === value;
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
      let result = await store.dispatch("DelatwAndroidPAD", { id: row.id });
      ElMessage({
        showClose: true,
        message: `${result}`,
        type: "success",
        center: true,
      });
      Fun.Refshash();
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
  //自动生成生产线名称
  MakeNUmberLine() {
    for (let i = 0; i <= 66; i++) {
      let item = { text: `${i}号位`, value: `${i}号位` };
      fileterSubordinateStation.push(item);
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
  //  提交表单
  async SubmitName() {
    let data: any = form.name;
    let change: string = dayjs(data.purchasingPeriod).format("YYYY-MM-DD HH:mm:ss");
    data.purchasingPeriod = change;
    try {
      await store.dispatch("POSTAndroidPADAddItem", data);
      Fun.Refshash();
      dialogFormVisible.value = false;
    } catch (e) {
      ElMessage.closeAll();
      ElMessage({
        showClose: true,
        message: `错误${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
  // 刷新
  async Refshash() {
    try {
      await store.dispatch("GETAndroidPADList", { index: form.currentPage, count: form.pageSize });
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
    form.currentPage = (Val - 1) * form.pageSize;
    Fun.Refshash();
  },
  ChangeCurrentChange(Val: any) {
    form.pageSize = Val;
    Fun.Refshash();
  },
  // TODO 改变数组ChangeTableData
  ChangeTableData(Val: string) {
    let list: object = [];
    if (Val) {
      form.tableData.forEach((Name: any) => {
        if (Name.supplier.toString() === Val.toString()) list.push(Name);
      });
      form.tableData = computed(() => list);
    } else {
      form.tableData = computed(() => store.state.AndroidPAD.AllTableList);
    }
  },
});

const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("GETAndroidPADSearch", {
        index: form.currentPage,
        pageSize: form.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.Refshash();
    }
  },
});

onMounted(async () => {
  nextTick(() => Fun.MakeNUmberLine());
  try {
    await store.dispatch("GETAndroidPADList", { index: form.currentPage, count: form.pageSize });
    await store.dispatch("GetDevicTtypeList");
  } catch (e) {
    ElMessage.closeAll();
    ElMessage({
      showClose: true,
      message: `${e.message}`,
      type: "error",
      center: true,
    });
  }
});
</script>
