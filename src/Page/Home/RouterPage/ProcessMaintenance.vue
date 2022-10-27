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
            <el-button type="primary" @click="Fun.GETProcessMaintenance()">刷新</el-button>
          </el-empty>
        </template>
        <!--   TODO --- 序号  -->
        <el-table-column align="center" :fixed="'left'" prop="date" label="序号" width="88">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><Discount /></el-icon>
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 工序编号  -->
        <el-table-column align="center" :fixed="'left'" prop="ProcessMaintenanceNumber" label="工序编号" width="388" />
        <!--   TODO --- id号  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="id" label="id号" width="116" />
        <!--   TODO --- 连接码  -->
        <el-table-column align="center" :fixed="'left'" prop="ProcessMaintenanceNo" label="连接码" width="116" />
        <!--      TODO 工序名称-->
        <el-table-column align="center" prop="ProcessMaintenanceName" label="工序名称" width="266" />
        <!--      TODO 工序描述-->
        <el-table-column align="center" prop="ProcessMaintenanceDetail" label="工序描述" width="466" />
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
      <el-input v-model="Search_Add.input" placeholder="请输入工序名称" @keyup.enter="Search_Add.GoSearch" />
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
      <!--          TODO 工序id号-->
      <el-form-item label="工序id号" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.id" placeholder="请输入工序id号" style="width: 300px" />
      </el-form-item>
      <!--      工序编号-->
      <el-form-item label="工序编号" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.ProcessMaintenanceNumber" placeholder="请输入工序编号">
          <el-option v-for="(LabelItem, LableIndex) in form.MenuBarList.DevicTtype" :key="LableIndex" :label="LabelItem" :value="LabelItem" />
        </el-select>
      </el-form-item>
      <!--      工序名称-->
      <el-form-item label="工序名称" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.ProcessMaintenanceName" placeholder="请输入工序名称" style="width: 300px" />
      </el-form-item>
      <!--      工序描述-->
      <el-form-item label="工序描述" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.ProcessMaintenanceDetail" placeholder="请输入工序描述" style="width: 300px" />
      </el-form-item>
      <!--      连接码-->
      <el-form-item label="连接码" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.ProcessMaintenanceNo" placeholder="请输入连接码" style="width: 300px" />
      </el-form-item>
      <!--      工序名称-->
      <el-form-item label="工序名称" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.ProcessMaintenanceSattionName" placeholder="请输入工序名称" style="width: 300px" />
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
import { Timer, Plus, Search, Delete, Platform } from "@element-plus/icons-vue";
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
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.ProcessMaintenanceANDFlowMaintenance.ProcessMaintenanceLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.ProcessMaintenanceANDFlowMaintenance.ProcessMaintenanceCountPage),
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
  // TODO 获取企业列表
  async GETProcessMaintenance() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETProcessMaintenance", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETProcessMaintenance();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETProcessMaintenance();
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
      let result = await store.dispatch("ProcessMaintenanceDelete", { id: row.id });
      ElMessage({
        showClose: true,
        message: `${result}`,
        type: "success",
        center: true,
      });
      Fun.GETProcessMaintenance();
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
      await store.dispatch("ProcessMaintenanceAddItem", data);
      Fun.GETProcessMaintenance();
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
    id: 2,
    ProcessMaintenanceNumber: "7d204bc5-3798-4bcd-91ee-36f885e5a853",
    ProcessMaintenanceName: "大数据科学与技术",
    ProcessMaintenanceDetail: "鱿鱼丝生产线",
    ProcessMaintenanceNo: 48,
    ProcessMaintenanceSattionName: "Web前端开发工程师",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("ProcessMaintenanceSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETProcessMaintenance();
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
  Fun.GETProcessMaintenance();
});
</script>
