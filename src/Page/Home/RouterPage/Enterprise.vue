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
        <!--      TODO 单位层次-->
        <el-table-column
          align="center"
          :fixed="'left'"
          prop="EnterpriseLeave"
          label="单位层次"
          width="190"
          style="text-align: center"
          :filters="DepartmentOfOwnershipList"
          :filter-method="Fun.DepartmentOfOwnershipListfilterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.filterTagDepartmentOfOwnership(scope.row.EnterpriseLeave)" disable-transitions>{{ scope.row.EnterpriseLeave }}</el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   单位名称-->
        <el-table-column align="center" prop="CompanyName" label="单位名称" width="566" />
        <!--   TODO ---   单位性质-->
        <el-table-column align="center" prop="CompanyRegisteredCapital" label="单位性质" width="180" />
        <!--   TODO ---   企业注册资本-->
        <el-table-column align="center" prop="CompanyRegisteredCapital" label="企业注册资本" width="160">
          <template #default="scope">
            <span>{{ scope.row.CompanyRegisteredCapital }} 万元</span>
          </template>
        </el-table-column>
        <!--   TODO ---   法人-->
        <el-table-column align="center" prop="Corp" label="法人" width="120" />
        <!--   TODO ---   法人身份证-->
        <el-table-column align="center" prop="CorpIdentityCard" label="法人身份证" width="260" />
        <!--   TODO ---   单位地址-->
        <el-table-column align="center" prop="CompanyAddress" label="单位地址" width="400" />
        <!--  TODO ---  邮政编码  -->
        <el-table-column align="center" prop="PostalCode" label="邮政编码" width="150" />
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
      <el-input v-model="Search_Add.input" placeholder="请输入法人" @keyup.enter="Search_Add.GoSearch" />
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
      <el-form-item label="单位层次" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.EnterpriseLeave" placeholder="请输入单位层次" style="width: 300px" />
      </el-form-item>
      <!--      设备条码-->
      <el-form-item label="单位名称" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.CompanyName" placeholder="请输入单位名称" style="width: 300px" />
      </el-form-item>
      <!--      设备规格-->
      <el-form-item label="企业注册资本" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.CompanyRegisteredCapital" placeholder="请输入企业注册资本" style="width: 300px" />
      </el-form-item>
      <!--      采购时间-->
      <el-form-item label="法人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Corp" placeholder="请输入法人" style="width: 300px" />
      </el-form-item>
      <!--      所属工站-->
      <el-form-item label="法人身份证" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.CorpIdentityCard" placeholder="请输入法人身份证" style="width: 300px" />
      </el-form-item>
      <!--      所属工位-->
      <el-form-item label="单位地址" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.CompanyAddress" type="datetime" placeholder="请输入单位地址" style="width: 300px" />
      </el-form-item>
      <!--      分辨率-->
      <el-form-item label="邮政编码" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.PostalCode" placeholder="请输入邮政编码" style="width: 300px" />
      </el-form-item>
      <!--      核心数-->
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
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { Timer, Plus, Search, Delete, Platform } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import dayjs from "dayjs";
interface User {
  EnterpriseLeave: string;
  CompanyName: string;
  CompanyRegisteredCapital: string;
  Corp: string;
  CorpIdentityCard: string;
  CompanyAddress: string;
  PostalCode: string;
  Codeempty: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
const DepartmentOfOwnershipList = [
  { text: "局级", value: "局级" },
  { text: "处级", value: "处级" },
  { text: "科级", value: "科级" },
  { text: "董事长", value: "董事长" },
  { text: "产品经理", value: "产品经理" },
];
var tableData = computed(() => store.state.Enterprise.EnterpriseLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Enterprise.countPage),
});
const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
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
  //  TODO 过滤标签
  filterTagDepartmentOfOwnership(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "局级":
        flag = "success";
        break;
      case "处级":
        flag = "warning";
        break;
      case "科级":
        flag = "danger";
        break;
      case "董事长":
        flag = "";
        break;
      case "产品经理":
        flag = "";
        break;
    }
    return flag;
  },
  // TODO 获取企业列表
  async GETEnterprise() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETEnterprise", { index: Data.currentPage, pageSize: Data.pageSize });
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
  // TODO 过滤所有权部门
  DepartmentOfOwnershipListfilterTag(value: string, row: User) {
    return row.EnterpriseLeave === value;
  },
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GETEnterprise();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETEnterprise();
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
      await store.dispatch("DeleteCompany", { id: row.id });
      Fun.GETEnterprise();
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
      await store.dispatch("CompanyAddItem", data);
      Fun.GETEnterprise();
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
    EnterpriseLeave: "",
    CompanyName: "",
    CompanyRegisteredCapital: "",
    Corp: "",
    CorpIdentityCard: "",
    CompanyAddress: "",
    PostalCode: "",
    Codeempty: undefined,
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("CompanySearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETEnterprise();
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
  Fun.GETEnterprise();
});
</script>
