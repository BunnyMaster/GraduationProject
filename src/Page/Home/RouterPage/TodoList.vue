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
            <el-button type="primary" @click="Fun.GETtodolistAll">刷新</el-button>
          </el-empty>
        </template>
        <!--   TODO --- 序号  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="id" label="序号" width="88">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span>{{ scope.$index + 1 }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 流程编码  -->
        <el-table-column align="center" sortable prop="AddTime" label="添加时间" width="226">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO 流程版本-->
        <el-table-column align="center" prop="AddPerson" label="添加人" width="188">
          <template #default="scope">
            <el-icon><UserFilled /></el-icon>
            <span>{{ scope.row.AddPerson }}</span>
          </template>
        </el-table-column>
        <!--      TODO 流程名称-->
        <el-table-column align="center" prop="TodoDetail" label="事件描述" width="666" />
        <!--      TODO 流程描述-->
        <el-table-column align="center" prop="EndTime" sortable="custom" label="结束时间" width="226">
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.EndTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="Sate"
          label="状态"
          width="auto"
          :filters="[
            { text: '完成', value: '完成' },
            { text: '未完成', value: '未完成' },
            { text: '执行中', value: '执行中' },
          ]"
          :filter-method="Fun.filterDepartmentOfOwnership"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.filterTagDepartmentOfOwnership(scope.row.Sate)" disable-transitions>
              {{ scope.row.Sate }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="Sate"
          label="分类"
          width="auto"
          :filters="[
            { text: '数学', value: '数学' },
            { text: '计算机', value: '计算机' },
            { text: '英语', value: '英语' },
            { text: '其他', value: '其他' },
          ]"
          :filter-method="Fun.filterDepartmentClassType"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="Fun.filterTagClassType(scope.row.ClassType)" disable-transitions>
              {{ scope.row.ClassType }}
            </el-tag>
          </template>
        </el-table-column>
        <!--  TODO --- 操作   -->
        <el-table-column align="center" label="操作" :fixed="'right'" width="336">
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
                <el-button size="default" type="danger" plain :icon="Delete"> 删除 </el-button>
              </template>
            </el-popconfirm>
            <el-button size="default" type="success" plain :icon="EditPen" @click="Fun.ChangeTodolistCountent(scope.$index, scope.row)"> 修改 </el-button>
            <el-dropdown>
              <el-button :type="Fun.filterTagSate(scope.row.Sate)" style="height: 35px; margin-left: 15px">
                完成情况
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="scope.row.Sate === '完成' ? '' : Fun.ChangeState(scope.$index, scope.row, '完成')" :disabled="scope.row.Sate === '完成'">
                    完成
                  </el-dropdown-item>
                  <el-dropdown-item @click="scope.row.Sate === '未完成' ? '' : Fun.ChangeState(scope.$index, scope.row, '未完成')" :disabled="scope.row.Sate === '未完成'">
                    未完成
                  </el-dropdown-item>
                  <el-dropdown-item @click="scope.row.Sate === '执行中' ? '' : Fun.ChangeState(scope.$index, scope.row, '执行中')" :disabled="scope.row.Sate === '执行中'">
                    执行中
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #Search_Add_Before>
      <el-input v-model="Search_Add.input" placeholder="请输入事件描述" @keyup.enter="Search_Add.GoSearch" />
      <el-button class="My-Search-Btn" type="success" :icon="Search" @click="Search_Add.GoSearch">搜索</el-button>
      <el-button v-if="Data.isShow !== 1" type="primary" plain @click="Data.isShow = 1" style="height: 35px">显示未删除</el-button>
      <el-button v-else type="primary" plain @click="Data.isShow = 0" style="height: 35px">显示全部</el-button>
    </template>
    <template #Search_Add_After>
      <el-button class="My-Search-Btn" type="success" :icon="Plus" @click="Search_Add.AddItem(true)" style="margin-right: 15px">添加</el-button>
    </template>
  </HomeTableCommon>
  <!--  对话框-->
  <el-dialog v-model="dialogFormVisible" :title="`${$route.meta.title}`" draggable="draggable">
    <el-form :model="form">
      <h1 style="text-align: center; margin-bottom: 16px">请添请加</h1>
      <!--          TODO 流程编码-->
      <el-form-item label="添加时间" :label-width="form.formLabelWidth">
        <div class="block">
          <el-date-picker v-model="form.name.AddTime" type="datetime" placeholder="请添加时间" />
        </div>
      </el-form-item>
      <!-- TODO 流程名称-->
      <el-form-item label="添加人" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.AddPerson" placeholder="请输入添加人" style="width: 300px" />
      </el-form-item>
      <!-- TODO 流程描述-->
      <el-form-item label="需要做的" :label-width="form.formLabelWidth">
        <el-input v-model="form.name.TodoDetail" placeholder="请输入需要做的" style="width: 300px" />
      </el-form-item>
      <!-- TODO 连接码-->
      <el-form-item label="预计结束时间" :label-width="form.formLabelWidth">
        <div class="block">
          <el-date-picker v-model="form.name.EndTime" type="datetime" placeholder="请输入预计结束时间" />
        </div>
      </el-form-item>
      <!-- TODO 流程版本-->
      <el-form-item label="当前状态" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.Sate" class="m-2" placeholder="请输入当前状态">
          <el-option label="完成" value="完成" /> <el-option label="未完成" value="未完成" /> <el-option label="执行中" value="执行中" />
        </el-select>
      </el-form-item>
      <!-- TODO 流程版本-->
      <el-form-item label="当前分类" :label-width="form.formLabelWidth">
        <el-select v-model="form.name.ClassType" class="m-2" placeholder="请选择当前分类">
          <el-option label="数学" value="数学" /> <el-option label="计算机" value="计算机" /> <el-option label="英语" value="英语" /><el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(dialogFormVisible = false), Fun.GETtodolistAll">返回</el-button>
        <el-button type="primary" @click="Data.isChangeTodolist ? Fun.SubmitName() : Fun.SubmitChange()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Timer, Plus, Search, Delete, ArrowDown, Discount, UserFilled, EditPen } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage, ElNotification } from "element-plus";
import dayjs from "dayjs";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
  Sate: string;
  ClassType: string;
}
const store = useStore();
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
var tableData = computed(() => store.state.TodolistAll.TodolistAllLsit);
const Data = reactive({
  currentPage: 1, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  AllPageSize: computed(() => store.state.TodolistAll.TodolistPageSize),
  isShow: 1,
  isChangeTodolist: true,
});
const Fun = reactive({
  // TODO 过滤列表
  filterDepartmentOfOwnership(value: string, row: User) {
    return row.Sate === value;
  },
  // TODO 过滤列表
  filterDepartmentClassType(value: string, row: User) {
    return row.ClassType === value;
  },
  //  TODO 过滤标签
  filterTagDepartmentOfOwnership(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "完成":
        flag = "success";
        break;
      case "未完成":
        flag = "warning";
        break;
      case "执行中":
        flag = "";
        break;
    }
    return flag;
  },
  //  TODO 过滤标签
  filterTagClassType(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "数学":
        flag = "success";
        break;
      case "计算机":
        flag = "warning";
        break;
      case "英语":
        flag = "danger";
        break;
      case "其他":
        flag = "";
        break;
    }
    return flag;
  },
  //  TODO 过滤标签
  filterTagSate(Stata: string) {
    let flag = "";
    switch (Stata) {
      case "完成":
        flag = "success";
        break;
      case "未完成":
        flag = "warning";
        break;
      case "执行中":
        flag = "primary";
        break;
    }
    return flag;
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
  // TODO 获取企业列表
  async GETtodolistAll() {
    ElMessage.closeAll();
    try {
      await store.dispatch("GETtodolistAll", { index: Data.currentPage, pageSize: Data.pageSize, isShow: Data.isShow });
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
    Fun.GETtodolistAll();
  },
  ChangeCurrentChange(Val: any) {
    Data.pageSize = Val;
    Fun.GETtodolistAll();
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
      tableData = computed(() => store.state.ProcessMaintenanceANDFlowMaintenance.ProcessFlowMaintenanceLsit);
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
      let result = await store.dispatch("todolistUpdateDelete", { id: row.uuid });
      ElMessage({
        showClose: true,
        message: `${result}`,
        type: "success",
        center: true,
      });
      Fun.GETtodolistAll();
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
    data.AddTime = dayjs(data.AddTime).format("YYYY年MM月DD号 HH:mm:ss");
    data.EndTime = dayjs(data.EndTime).format("YYYY年MM月DD号 HH:mm:ss");
    const { AddTime, AddPerson, TodoDetail, EndTime, Sate, ClassType } = form.name;
    if (AddTime && AddPerson && TodoDetail && EndTime && Sate && ClassType) {
      try {
        await store.dispatch("todolistAddItem", data);
        Fun.GETtodolistAll();
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
    }
  },
  //  修改完成状态
  async ChangeState(index: number, scop: any, val: string) {
    try {
      await store.dispatch("todolistUpdatecomplet", {
        uuid: scop.uuid,
        Sate: val,
      });
      Fun.GETtodolistAll();
      ElMessage({
        showClose: true,
        message: "修改成功",
        type: "success",
        center: true,
      });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "success",
        center: true,
      });
    }
  },
  //  TODO 修改ChangeTodolistCountent
  async ChangeTodolistCountent(index: number, row: any) {
    try {
      Data.isChangeTodolist = false;
      let data = row;
      data.AddTime = dayjs(data.AddTime.replace("年", "-").replace("月", "-").replace("号", "")).format();
      data.EndTime = dayjs(data.EndTime.replace("年", "-").replace("月", "-").replace("号", "")).format();
      form.name = data;
      dialogFormVisible.value = true;
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
  //  TODO 提交修改选项
  async SubmitChange() {
    try {
      let data: any = form.name;
      data.AddTime = dayjs(form.name.AddTime).format("YYYY年MM月DD号 HH:mm:ss");
      data.EndTime = dayjs(form.name.EndTime).format("YYYY年MM月DD号 HH:mm:ss");
      await store.dispatch("ChangeTodolistCountent", data);
      dialogFormVisible.value = false;
      Data.isChangeTodolist = false;
      Fun.GETtodolistAll();
      ElMessage({
        showClose: true,
        message: "修改成功",
        type: "success",
        center: true,
      });
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "success",
        center: true,
      });
    }
  },
});

var dialogFormVisible = ref(false);
const form = reactive({
  name: {
    AddTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    AddPerson: "",
    TodoDetail: "",
    EndTime: "",
    Sate: "",
    ClassType: "",
  },
  delivery: false,
  formLabelWidth: "140px",
  MenuBarList: computed(() => store.state.MenuBar.DevicTtype),
});
const Search_Add = reactive({
  input: "",
  GoSearch() {
    if (Search_Add.input !== "" && Search_Add.input !== undefined && Search_Add.input.trim()) {
      store.dispatch("todolistSearch", {
        index: Data.currentPage,
        pageSize: Data.pageSize,
        keyword: Search_Add.input.trim(),
      });
    } else {
      Fun.GETtodolistAll();
    }
  },
  //  TODO 添加数据
  AddItem(flag: boolean) {
    dialogFormVisible.value = flag;
    Data.isChangeTodolist = true;
    if (dialogFormVisible.value) {
      ElMessage.closeAll();
      ElNotification.closeAll();
      ElNotification({
        showClose: true,
        message: "请添加你想添加的内容",
        type: "success",
        position: "top-left",
      });
    }
  },
});

onMounted(() => {
  Fun.GETtodolistAll();
  watch(
    () => Data.isShow,
    () => Fun.GETtodolistAll(),
    { deep: true },
  );
});
</script>

<style scoped lang="less">
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
