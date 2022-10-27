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
            <el-button type="primary" @click="Fun.GETOrderManagement()">刷新</el-button>
          </el-empty>
        </template>
        <!--   TODO --- 序号  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="id" label="序号" width="88" />
        <!--   TODO --- 订购日期  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="OrderTime" label="订购日期" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.OrderTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 订单号-->
        <el-table-column align="center" prop="OrderNumber" label="订单号" width="366" />
        <!--      TODO 订购商-->
        <el-table-column align="center" prop="OrderMaker" label="订购商" width="466" />
        <!--      TODO 产品名称-->
        <el-table-column align="center" prop="ProductName" label="产品名称" width="280" />
        <!--   TODO --- 数量  -->
        <el-table-column align="center" sortable prop="number" label="数量" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><Discount /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.number }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 产线名称-->
        <el-table-column
          align="center"
          prop="LineName"
          label="产线名称"
          width="190"
          :filters="[
            { text: '金龙鱼生产线', value: '金龙鱼生产线' },
            { text: '鱿鱼丝生产线', value: '鱿鱼丝生产线' },
            { text: '金枪鱼生产线', value: '金枪鱼生产线' },
            { text: '马哈鱼生产线', value: '马哈鱼生产线' },
          ]"
          :filter-method="Fun.LineNamefilterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.workStationClass(scope.row.LineName)" disable-transitions>{{ scope.row.LineName }}</el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   经办人-->
        <el-table-column align="center" prop="Mainname" label="经办人" width="150" />
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
      <el-input v-model="Search_Add.input" placeholder="请输入主要经办人" @keyup.enter="Search_Add.GoSearch" />
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
      <el-form-item label="订单日期" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker v-model="form.name.OrderTime" type="datetime" placeholder="请输入订单日期" />
        </div>
      </el-form-item>
      <!--      设备条码-->
      <el-form-item label="订单编号" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.OrderNumber" placeholder="请输入订单编号" style="width: 300px" />
      </el-form-item>
      <!--      设备规格-->
      <el-form-item label="订购商" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.OrderMaker" placeholder="请输入订购商" style="width: 300px" />
      </el-form-item>
      <!--      采购时间-->
      <el-form-item label="产品名称" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.ProductName" placeholder="请输入产品名称" style="width: 300px" />
      </el-form-item>
      <!--      所属工站-->
      <el-form-item label="产线名称" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.LineName" placeholder="请输入产线名称" style="width: 300px" />
      </el-form-item>
      <!--      所属工位-->
      <el-form-item label="数量" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.number" placeholder="请输入数量" style="width: 300px" />
      </el-form-item>
      <!--      分辨率-->
      <el-form-item label="单位" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Unit" placeholder="请输入单位" style="width: 300px" />
      </el-form-item>
      <!--      核心数-->
      <el-form-item label="经办人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Mainname" placeholder="请输入经办人" style="width: 300px" />
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
import { computed, onMounted, reactive, ref } from "vue";
import { Timer, Plus, Search, Delete, Platform, Discount } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
interface User {
  id: number;
  OrderTime: string;
  OrderNumber: string;
  OrderMaker: string;
  ProductName: string;
  LineName: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.OrderManagement.OrderManagementLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.OrderManagement.OrderManagementCountPage),
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
  // TODO  所属工站
  LineNamefilterTag(value: string, row: User) {
    return row.LineName === value;
  },
  // TODO  所属工站
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
      await store.dispatch("DeleteOrderManagement", { id: row.id });
      Fun.GETOrderManagement();
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
    let change: string = dayjs(data.OrderTime).format("YYYY-MM-DD HH:mm:ss");
    data.OrderTime = change;
    try {
      await store.dispatch("OrderManagementAddItem", data);
      Fun.GETOrderManagement();
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
  // 获取订单信息
  async GETOrderManagement() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETOrderManagement", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETOrderManagement();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETOrderManagement();
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
      tableData = computed(() => store.state.OrderManagement.OrderManagementLsit);
    }
  },
});

var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    OrderTime: `${dayjs(new Date()).format("YYYY-MM-DD d HH:mm:ss")}`,
    OrderNumber: "",
    OrderMaker: "",
    ProductName: "",
    LineName: "",
    number: "",
    Unit: "",
    Mainname: "",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("OrderManagementSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETOrderManagement();
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
  Fun.GETOrderManagement();
});
</script>
