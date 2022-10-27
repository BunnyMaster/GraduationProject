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
        <!--      TODO 工厂名称-->
        <el-table-column align="center" prop="factoryAdress" label="工厂名称" width="466" />
        <!--  TODO ---  创建日期  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="CreateTime" label="创建日期" width="266" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.CreateTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   建筑面积-->
        <el-table-column align="center" :fixed="'left'" sortable prop="StructureArea" label="建筑面积" width="130" style="text-align: center" />
        <!--   TODO ---   工厂地址-->
        <el-table-column align="center" prop="factoryName" label="工厂地址" width="166" />
        <!--   TODO ---   工厂电话-->
        <el-table-column align="center" prop="factoryPhone" label="工厂电话" width="188" />
        <!--  TODO ---  邮政编码  -->
        <el-table-column align="center" prop="PostalCode" label="邮政编码" width="266" />
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
      <el-input v-model="Search_Add.input" placeholder="请输入工厂名" @keyup.enter="Search_Add.GoSearch" />
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
      <el-form-item label="邮政编码" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.PostalCode" placeholder="请输入邮政编码" style="width: 300px" />
      </el-form-item>
      <el-form-item label="占地面积" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.StructureArea" placeholder="请输入占地面积" style="width: 300px" />
      </el-form-item>
      <el-form-item label="工厂名" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.factoryName" placeholder="请输入工厂名" style="width: 300px" />
      </el-form-item>
      <el-form-item label="工厂地址" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.factoryAdress" placeholder="请输入工厂地址" style="width: 300px" />
      </el-form-item>
      <el-form-item label="工厂电话" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.factoryPhone" placeholder="请输入工厂电话" style="width: 300px" />
      </el-form-item>
      <el-form-item label="创建时间" :label-width="form.formLabelWidth">
        <div class="block" style="width: 300px">
          <el-date-picker type="datetime" v-model="form.name.CreateTime" placeholder="请输入创建时间" />
        </div>
      </el-form-item>
      <el-form-item label="连接码" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Codeempty" placeholder="请输入连接码" style="width: 300px" />
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
import { Timer, Plus, Search, Delete, Platform } from "@element-plus/icons-vue";
import dayjs from "dayjs";
interface User {
  CreateTime: string;
  StructureArea: string;
  factoryName: string;
  factoryAdress: string;
  factoryPhone: string;
  PostalCode: string;
  Codeempty: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.Factory.FactoryLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Factory.countPage),
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
      await store.dispatch("Deletefactory", { id: row.id });
      Fun.GETFactory();
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
    let change: string = dayjs(data.CreateTime).format("YYYY-MM-DD HH:mm:ss");
    data.CreateTime = change;
    try {
      await store.dispatch("factoryAddItem", data);
      Fun.GETFactory();
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
  async GETFactory() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETFactory", { index: Data.currentPage, pageSize: Data.pageSize });
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
    Fun.GETFactory();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETFactory();
  },
});

var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    CreateTime: `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
    StructureArea: "m²",
    factoryName: "",
    factoryAdress: "",
    factoryPhone: "",
    PostalCode: "",
    Codeempty: "",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("factorySearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETFactory();
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
  Fun.GETFactory();
});
</script>
