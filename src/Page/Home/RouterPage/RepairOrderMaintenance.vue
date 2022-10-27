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
            <el-button type="primary">刷新</el-button>
          </el-empty>
        </template>
        <!--   TODO --- 序号  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="id" label="序号" width="88" />
        <!--   TODO --- 订购日期  -->
        <el-table-column align="center" sortable prop="OrderTime" label="订购日期" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.OrderTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 订单号-->
        <el-table-column align="center" prop="OrderNumber" label="订单号" width="366" />
        <!--   TODO ---   工单类型-->
        <el-table-column align="center" prop="artifactClass" label="工单类型" width="266" />
        <!--   TODO --- 工单生产数量  -->
        <el-table-column align="center" sortable prop="number" label="工单生产数量" width="288">
          <template #default="scope">
            <span>{{ scope.row.number }} 件</span>
          </template>
        </el-table-column>
        <!--   TODO --- 预计生产时间  -->
        <el-table-column align="center" sortable prop="artifactMakeTime" label="预计生产时间" width="188">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.artifactMakeTime }}天</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 预计结束时间  -->
        <el-table-column align="center" sortable prop="artifactMakeEndTime" label="预计结束时间" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.artifactMakeEndTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 实际生产时间  -->
        <el-table-column align="center" sortable prop="artifactAtualMakeTime" label="实际生产时间" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.artifactAtualMakeTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 投入数量  -->
        <el-table-column align="center" sortable prop="PutNum" label="投入数量" width="190">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><DocumentAdd /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.PutNum }} 件</span>
            </div>
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
      <el-input v-model="Search_Add.input" placeholder="请输入工单类型" @keyup.enter="Search_Add.GoSearch" />
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
      <el-form-item label="预计生产天数" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.UnitMeasurement" placeholder="请输入预计生产天数" style="width: 300px" />
      </el-form-item>
      <!--      设备条码-->
      <el-form-item label="工单类型" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.artifactClass" placeholder="请输入工单类型" style="width: 300px" />
      </el-form-item>
      <!--      设备规格-->
      <el-form-item label="生产数量" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.MakeNum" placeholder="请输入生产数量" style="width: 300px" />
      </el-form-item>
      <!--      采购时间-->
      <el-form-item label="预计生产时间" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.artifactMakeTime" placeholder="请输入预计生产时间" style="width: 300px" />
      </el-form-item>
      <!--      所属工站-->
      <el-form-item label="预计结束时间" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker v-model="form.name.artifactMakeEndTime" placeholder="请输入预计结束时间" type="datetime" />
        </div>
      </el-form-item>
      <!--      所属工位-->
      <el-form-item label="实际生产时间" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker v-model="form.name.artifactAtualMakeTime" type="datetime" placeholder="请输入实际生产时间" />
        </div>
      </el-form-item>
      <!--      分辨率-->
      <el-form-item label="投入数量" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.PutNum" placeholder="请输入投入数量" style="width: 300px" />
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
import { Timer, Plus, Search, Delete, Platform, DocumentAdd } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
interface User {
  UnitMeasurement: string;
  artifactClass: string;
  MakeNum: string;
  artifactMakeTime: string;
  artifactMakeEndTime: string;
  artifactAtualMakeTime: string;
  PutNum: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.OrderManagement.RepairOrderMaintenancetLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.OrderManagement.RepairOrderMaintenancetCountPage),
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
      let result = await store.dispatch("DeleteRepairOrderMaintenance", { id: row.id });
      ElMessage({
        showClose: true,
        message: `${result}`,
        type: "success",
        center: true,
      });
      Fun.GETRepairOrderMaintenancet();
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
    data.artifactMakeEndTime = dayjs(data.artifactMakeEndTime).format("YYYY-MM-DD HH:mm:ss");
    data.artifactAtualMakeTime = dayjs(data.artifactAtualMakeTime).format("YYYY-MM-DD HH:mm:ss");
    try {
      await store.dispatch("RepairOrderMaintenanceAddItem", data);
      Fun.GETRepairOrderMaintenancet();
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
  async GETRepairOrderMaintenancet() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETRepairOrderMaintenancet", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETRepairOrderMaintenancet();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETRepairOrderMaintenancet();
  },
});

var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    UnitMeasurement: "",
    artifactClass: "",
    MakeNum: "",
    artifactMakeTime: "",
    artifactMakeEndTime: `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
    artifactAtualMakeTime: `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
    PutNum: "",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("RepairOrderMaintenanceSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETRepairOrderMaintenancet();
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
  Fun.GETRepairOrderMaintenancet();
});
</script>
