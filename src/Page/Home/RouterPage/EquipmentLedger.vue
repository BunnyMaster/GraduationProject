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
        <el-table-column align="center" :fixed="'left'" prop="id" label="序号" width="116">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!--   TODO --- 编号  -->
        <el-table-column align="center" sortable prop="EquipmentLedgerNum" label="编号" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><Discount /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.EquipmentLedgerNum }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 设备类型-->
        <el-table-column align="center" prop="EquipmentType" label="设备类型" width="166" />
        <!--      TODO 设备规格-->
        <el-table-column align="center" prop="EquipmentEPEC" label="设备规格" width="260" />
        <!--      TODO 供应商-->
        <el-table-column align="center" prop="Provider" label="供应商" width="400" />
        <!--      TODO 出厂编号-->
        <el-table-column align="center" prop="SubPerson" label="上报人" width="166" />
        <!--      TODO 用途-->
        <el-table-column align="center" prop="ToUse" label="用途" width="出厂编号" />
        <!--   TODO --- 采购日期  -->
        <el-table-column align="center" sortable prop="ImportanTime" label="采购日期" width="266">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.ImportanTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 资产负责人-->
        <el-table-column align="center" prop="principal" label="资产负责人" width="150" />
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
      <el-input v-model="Search_Add.input" placeholder="请输入上报人" @keyup.enter="Search_Add.GoSearch" />
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
      <!--      设备规格-->
      <el-form-item label="编号" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.EquipmentLedgerNum" placeholder="请输入编号" style="width: 300px" />
      </el-form-item>
      <el-form-item label="设备类型" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.EquipmentType" placeholder="请输入设备类型" style="width: 300px" />
      </el-form-item>
      <el-form-item label="设备规格" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.EquipmentEPEC" placeholder="请输入设备规格" style="width: 300px" />
      </el-form-item>
      <el-form-item label="供应商" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Provider" placeholder="请输入供应商" style="width: 300px" />
      </el-form-item>
      <el-form-item label="上报人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.SubPerson" placeholder="请输入上报人" style="width: 600px" />
      </el-form-item>
      <el-form-item label="用途" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.ToUse" placeholder="请输入用途" style="width: 300px" />
      </el-form-item>
      <el-form-item label="采购时间" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker v-model="form.name.ImportanTime" type="datetime" placeholder="请输入采购时间" />
        </div>
      </el-form-item>
      <el-form-item label="资产负责人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.principal" placeholder="请输入资产负责人" style="width: 300px" />
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
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { Plus, Search, Delete, UserFilled, Timer, Discount } from "@element-plus/icons-vue";
import dayjs from "dayjs";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.RepairCord.equipmentledgerLIst);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.RepairCord.equipmentledgerCountPage),
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
  async GETequipmentledger() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETequipmentledger", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETequipmentledger();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETequipmentledger();
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
      tableData = computed(() => store.state.RepairCord.equipmentledgerLIst);
    }
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
      await store.dispatch("EquipmentLedgerDelete", { id: row.id });
      Fun.GETequipmentledger();
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
    data.ImportanTime = dayjs(data.ImportanTime).format("YYYY-MM-DD HH:mm:ss");
    try {
      await store.dispatch("EquipmentLedgerAddItem", data);
      Fun.GETequipmentledger();
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
    EquipmentLedgerNum: "eql-110000201009285644",
    EquipmentType: "打印机",
    EquipmentEPEC: "水洗布",
    Provider: "深圳市贝约瀚有限公司",
    SubPerson: "薛平",
    ToUse: "家用小称",
    ImportanTime: "2022-10-22 17:05:33",
    principal: "韦宜豪",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("EquipmentLedgerSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETequipmentledger();
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
  Fun.GETequipmentledger();
});
</script>
