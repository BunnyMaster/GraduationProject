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
            <el-button type="primary" @click="Fun.GETStaff()">刷新</el-button>
          </el-empty>
        </template>
        <!--      TODO 员工编号-->
        <el-table-column align="center" :fixed="'left'" prop="LocalNumber" label="员工编号" width="190" style="text-align: center" />
        <!--   TODO ---   员工姓名-->
        <el-table-column align="center" prop="factoryMainName" label="员工姓名" width="260" />
        <!--      TODO 入职日期-->
        <el-table-column align="center" :fixed="'left'" prop="jobTime" label="入职日期" width="190" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span v-if="scope.row.jobTime">{{ scope.row.jobTime }}</span>
              <span v-else>无数据</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   所属部门-->
        <el-table-column
          align="center"
          prop="PersonLeave"
          label="所属部门"
          :fixed="'left'"
          width="120"
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
            <el-tag v-if="scope.row.PersonLeave" :type="Fun.filterTagDepartmentOfOwnership(scope.row.PersonLeave)" disable-transitions>
              {{ scope.row.PersonLeave }}
            </el-tag>
            <el-tag v-else :type="'warning'" disable-transitions> 无数据 </el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   性别-->
        <el-table-column
          align="center"
          prop="gender"
          :filters="[
            { text: '男', value: '男' },
            { text: '女', value: '女' },
            { text: '变态', value: '变态' },
          ]"
          :filter-method="Fun.filterTag"
          filter-placement="bottom-end"
          label="性别"
          width="180"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.gender" :type="Fun.GenderFilter(scope.row.gender)" disable-transitions>
              {{ scope.row.gender === "undefined" ? "未知" : scope.row.gender }}
            </el-tag>
            <el-tag v-else :type="'danger'" disable-transitions> 无数据 </el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   年龄-->
        <el-table-column align="center" prop="age" label="年龄" width="180">
          <template #default="scope">
            <span v-if="scope.row.jobTime">{{ scope.row.age }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
          </template>
        </el-table-column>
        <!--   TODO ---   电话-->
        <el-table-column align="center" prop="workstationNumber" label="电话" width="180" />
        <!--   TODO ---   地址-->
        <el-table-column align="center" prop="StaffAddress" label="地址" :formatter="Fun.formatter" width="400">
          <template #default="scope">
            <span v-if="scope.row.StaffAddress">{{ scope.row.StaffAddress }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
          </template>
        </el-table-column>
        <!--   TODO ---   邮箱-->
        <el-table-column align="center" prop="email" label="邮箱" width="180">
          <template #default="scope">
            <span v-if="scope.row.email">{{ scope.row.email }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
          </template>
        </el-table-column>
        <!--   TODO ---   身份证-->
        <el-table-column align="center" prop="idCare" label="身份证" width="260">
          <template #default="scope">
            <span v-if="scope.row.idCare">{{ scope.row.idCare }}</span>
            <span v-else style="color: #f56c6c">无数据</span>
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
      <!--      设备规格-->
      <el-form-item label="产线编号" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.LocalNumber" placeholder="请输入产线编号" style="width: 300px" />
      </el-form-item>
      <el-form-item label="产线名称" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.LocalName" placeholder="请输入产线名称" style="width: 300px" />
      </el-form-item>
      <el-form-item label="主要负责人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.factoryMainName" placeholder="请输入主要负责人" style="width: 300px" />
      </el-form-item>
      <el-form-item label="产线描述" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.factoryDtail" placeholder="请输入产线描述" style="width: 300px" />
      </el-form-item>
      <el-form-item label="工作站名称" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.workstationName" placeholder="请输入工作站名称" style="width: 600px" />
      </el-form-item>
      <el-form-item label="工作站编号" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.workstationNumber" placeholder="请输入工作站编号" style="width: 300px" />
      </el-form-item>
      <el-form-item label="连接码" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.Codeempty" placeholder="请输入连接码" style="width: 300px" />
      </el-form-item>
      <el-form-item label="工作名" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.workName" placeholder="请输入工作名" style="width: 300px" />
      </el-form-item>
      <el-form-item label="入职时间" :label-width="form.formLabelWidth">
        <div class="block">
          <el-date-picker v-model="form.name.jobTime" type="datetime" placeholder="请输入入职时间" />
        </div>
      </el-form-item>
      <el-form-item label="年龄" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.age" placeholder="请输入年龄" style="width: 300px" />
      </el-form-item>
      <el-form-item label="性别" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.gender" class="m-2" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.email" placeholder="请输入电子邮箱" style="width: 300px" />
      </el-form-item>
      <el-form-item label="职位等级" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.PersonLeave" placeholder="请输入职位等级" style="width: 300px" />
      </el-form-item>
      <el-form-item label="身份证" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.idCare" placeholder="请输入身份证" style="width: 300px" />
      </el-form-item>
      <el-form-item label="家庭住址" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.StaffAddress" placeholder="请输入地址" style="width: 300px" />
      </el-form-item>
      <el-form-item label="下班时间" :label-width="form.formLabelWidth">
        <div class="block">
          <el-date-picker v-model="form.name.OffDutyTime" type="datetime" placeholder="请输入下班时间" />
        </div>
      </el-form-item>
      <el-form-item label="下班时间" :label-width="form.formLabelWidth">
        <div class="block">
          <el-date-picker v-model="form.name.OfficeTime" type="datetime" placeholder="请输入正常下班时间" />
        </div>
      </el-form-item>
      <el-form-item label="部门名" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.depno" placeholder="请输入部门名" style="width: 300px" />
      </el-form-item>
      <el-form-item label="你的电话" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.tel" placeholder="请输入电话" style="width: 300px" />
      </el-form-item>
      <el-form-item label="在线状态" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.Sate" class="m-2" placeholder="请选择在线状态">
          <el-option label="在线" value="在线" />
          <el-option label="下班" value="下班" />
          <el-option label="公出" value="公出" />
          <el-option label="请假" value="请假" />
        </el-select>
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
var tableData = computed(() => store.state.Staff.StaffLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.Staff.countPage),
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
  GenderFilter(Sate: any) {
    let flag = "";
    switch (Sate) {
      case "男":
        flag = "";
        break;
      case "变态":
        flag = "warning";
        break;
      case "女":
        flag = "danger";
        break;
    }
    return flag;
  },
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.gender === value;
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
  //TODO 点击编辑
  handleEdit(index, row) {},
  //  TODO 获取工厂信息
  async GETStaff() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETStaff", { index: Data.currentPage, pageSize: Data.pageSize });
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
  //  TODO ChangeCurrentPage && pageSize
  ChangepageSize(Val: any) {
    Data.currentPage = Data.pageSize * (Val - 1);
    Fun.GETStaff();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETStaff();
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
      tableData = computed(() => store.state.Workshop.WorkshopLsit);
    }
  },
  // TODO 提交表单
  async SubmitName() {
    ElMessage.closeAll();
    let data: any = form.name;
    data.jobTime = dayjs(data.jobTime).format("YYYY-MM-DD HH:mm:ss");
    data.OffDutyTime = dayjs(data.OffDutyTime).format("YYYY-MM-DD HH:mm:ss");
    data.OfficeTime = dayjs(data.OfficeTime).format("YYYY-MM-DD HH:mm:ss");
    try {
      await store.dispatch("PerformanceStaffAddItem", data);
      Fun.GETStaff();
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
      await store.dispatch("PerformanceStaffDelete", { id: row.id });
      Fun.GETStaff();
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
});

var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    LocalNumber: "ws-5b98382b28f1",
    LocalName: "马哈鱼生产线",
    factoryMainName: "韩冰枫",
    factoryDtail: "行政办公室 金龙鱼生产线 董事长",
    workstationName: "17号工站",
    workstationNumber: "420101198101018821",
    Codeempty: "17",
    workName: "处级",
    jobTime: null,
    age: null,
    gender: null,
    email: null,
    PersonLeave: null,
    idCare: null,
    StaffAddress: null,
    OffDutyTime: null,
    OfficeTime: null,
    depno: null,
    tel: null,
    Sate: "在线",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("GETPerformanceStaffSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETStaff();
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
  // TODO 点击删除
  async handleDelete(index: number, row: any) {
    ElMessage.closeAll();
    try {
      await store.dispatch("PerformanceStaffDelete", { id: row.id });
      Fun.GETStaff();
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
});
onMounted(() => {
  Fun.GETStaff();
});
</script>
