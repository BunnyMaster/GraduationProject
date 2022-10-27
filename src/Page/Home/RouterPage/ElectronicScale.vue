<template>
  <HomeTableCommon
    :tableList="tableList"
    :tableData="tableData"
    :AllPageSize="Data.AllPageSize"
    @ChangepageSize="Fun.ChangepageSize"
    @ChangeCurrentChange="Fun.ChangeCurrentChange"
  >
    <template #default>
      <el-table
        element-loading-text="数据加载中..."
        element-loading-background="rgba(255, 255, 255, 0.8)"
        :data="tableData"
        style="width: 100%"
        stripe
        :row-class-name="Fun.tableRowClassName"
        :default-sort="{ prop: 'date', order: 'descending' }"
        max-height="650"
      >
        <template #empty>
          <el-empty>
            <template #description> 暂无数据</template>
            <el-button type="primary" @click="Fun.GetElectronicScaleList()">刷新</el-button>
          </el-empty>
        </template>
        <!--      TODO 设备条码-->
        <el-table-column align="center" :fixed="'left'" sortable prop="BarCodeEquipment" label="设备条码" width="366" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <JsBarcode :jsbarcodeInfo="scope.row.BarCodeEquipment" :text="$route.meta.title" />
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 设备类型  -->
        <el-table-column align="center" :fixed="'left'" sortable="custom" prop="ScaleName" label="设备类型" width="150">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon :size="16"><Platform /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.ScaleName }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO --- 设备规格-->
        <el-table-column align="center" :fixed="'left'" prop="specificationOfEquipment" label="设备规格" width="150">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span>{{ scope.row.specificationOfEquipment }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站 workStation-->
        <el-table-column
          align="center"
          prop="workStation"
          label="所属工站"
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
            <el-tag :type="Fun.workStationClass(scope.row.workStation)" disable-transitions>{{ scope.row.workStation }}</el-tag>
          </template>
        </el-table-column>
        <!--    TODO ---  所属工位-->
        <el-table-column align="center" prop="SubordinateStation" label="所属工位" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.SubordinateStation === '1号位' ? '' : 'success'" disable-transitions>{{ scope.row.SubordinateStation }}</el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   时间-->
        <el-table-column align="center" prop="purchasingPeriod" label="时间" width="266">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              <el-icon style="margin-right: 10px"><Timer /></el-icon>
              {{ scope.row.purchasingPeriod ? scope.row.purchasingPeriod.replace("T", " ").replace(".000Z", "") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 称量范围   -->
        <el-table-column align="center" prop="WeighingScale" label="称量范围" width="180">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">{{ scope.row.WeighingScale }} KG</span>
          </template>
        </el-table-column>
        <!--   TODO --- 重量  -->
        <el-table-column align="center" prop="weight" label="重量" width="180">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">{{ scope.row.weight }} KG</span>
          </template>
        </el-table-column>
        <!-- TODO ---  供应商   -->
        <el-table-column align="center" prop="manufacturer" label="供应商" width="566">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">{{ scope.row.manufacturer }}</span>
          </template>
        </el-table-column>
        <!--  TODO ---  生产商  -->
        <el-table-column align="center" prop="supplier" label="生产商" width="366">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.supplier ? scope.row.supplier.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 出厂编号   -->
        <el-table-column align="center" prop="manufacturing" label="出厂编号" width="266">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.manufacturing ? scope.row.manufacturing.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--   TODO ---   用途-->
        <el-table-column align="center" prop="USEFor" label="用途" width="400">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.USEFor ? scope.row.USEFor.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 资产负责人   -->
        <el-table-column align="center" prop="PrincipalOfAssets" label="资产负责人" width="120">
          <template #default="scope">
            <span style="justify-content: center; display: flex; align-items: center">
              {{ scope.row.PrincipalOfAssets ? scope.row.PrincipalOfAssets.replaceAll("'", " ") : "" }}
            </span>
          </template>
        </el-table-column>
        <!--  TODO --- 所有权部门   DepartmentOfOwnership-->
        <el-table-column
          align="center"
          prop="DepartmentOfOwnership"
          label="所有权部门"
          width="130"
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
            <el-tag :type="Fun.filterTagDepartmentOfOwnership(scope.row.DepartmentOfOwnership)" disable-transitions>
              {{ scope.row.DepartmentOfOwnership ? scope.row.DepartmentOfOwnership.replaceAll("'", "") : "" }}
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
      <el-form-item label="设备类型" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.ScaleName" placeholder="请输入设备类型">
          <el-option v-for="(LabelItem, LableIndex) in form.MenuBarList.DevicTtype" :key="LableIndex" :label="LabelItem" :value="LabelItem" />
        </el-select>
      </el-form-item>
      <!--      设备规格-->
      <el-form-item label="设备规格" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.specificationOfEquipment" placeholder="请输入设备规格" style="width: 300px" />
      </el-form-item>
      <!--      采购时间-->
      <el-form-item label="所属工站" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.workStation" placeholder="所属工站" style="width: 300px" />
      </el-form-item>
      <!--      所属工站-->
      <el-form-item label="所属工位" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.SubordinateStation" placeholder="请输入所属工位" style="width: 300px" />
      </el-form-item>
      <!--      所属工位-->
      <el-form-item label="时间" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker v-model="form.name.purchasingPeriod" type="datetime" placeholder="请输入时间" />
        </div>
      </el-form-item>
      <!--      分辨率-->
      <el-form-item label="称量范围" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.WeighingScale" placeholder="请输入称量范围" style="width: 300px" />
      </el-form-item>
      <!--      核心数-->
      <el-form-item label="重量" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.weight" placeholder="请输入重量" style="width: 300px" />
      </el-form-item>
      <!--      内存-->
      <el-form-item label="供应商" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.manufacturer" placeholder="请输入供应商" style="width: 300px" />
      </el-form-item>
      <el-form-item label="生产商" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.supplier" placeholder="请输入生产商" style="width: 300px" />
      </el-form-item>
      <el-form-item label="出厂编号" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.manufacturing" placeholder="请输入出厂编号" style="width: 300px" />
      </el-form-item>
      <el-form-item label="用途" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.USEFor" placeholder="请输入用途" style="width: 300px" />
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
const tableData = computed(() => store.state.ElectronicScale.ElectronicScaleAllLIst);

const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.ElectronicScale.CountPage),
});
const Fun = reactive({
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.workStation === value;
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
      Fun.GetElectronicScaleList();
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
      Fun.GetElectronicScaleList();
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
  async GetElectronicScaleList() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GetElectronicScaleList", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GetElectronicScaleList();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GetElectronicScaleList();
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
      store.dispatch("ElectronicScaleSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GetElectronicScaleList();
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
  Fun.GetElectronicScaleList();
});
</script>

<style scoped lang="less">
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
