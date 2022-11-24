<template>
  <el-drawer v-model="table" title="日程简易预览" direction="rtl" size="50%">
    <el-table :data="Data.ClickDateList" style="width: 100%" stripe :row-class-name="Fun.tableRowClassName" :default-sort="{ prop: 'date', order: 'descending' }" max-height="650">
      <template #empty>
        <el-empty>
          <template #description> 暂无数据 </template>
        </el-empty>
      </template>
      <!--   TODO --- 序号  -->
      <el-table-column align="center" :fixed="'left'" sortable prop="id" label="序号" width="88" />
      <!--   TODO --- 流程编码  -->
      <el-table-column align="center" sortable prop="AddTime" label="添加时间" width="188" />
      <!--      TODO 流程版本-->
      <el-table-column align="center" prop="AddPerson" label="添加人" width="188" />
      <!--      TODO 流程名称-->
      <el-table-column align="center" prop="TodoDetail" label="事件描述" width="466" />
      <!--      TODO 流程描述-->
      <el-table-column align="center" prop="EndTime" sortable="custom" label="结束时间" width="188" />
      <el-table-column align="center" prop="Sate" label="状态" width="auto" />
      <el-table-column align="center" prop="Sate" label="状态" width="auto" />
    </el-table>
  </el-drawer>
  <el-calendar>
    <template #header="{ date }">
      <span>计划日程简易日历</span>
      <h2>{{ date }}</h2>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-year')"> 上一年 </el-button>
        <el-button size="small" @click="selectDate('prev-month')"> 上个月 </el-button>
        <el-button size="small" @click="selectDate('today')"> 今天 </el-button>
        <el-button size="small" @click="selectDate('next-month')"> 下个月 </el-button>
        <el-button size="small" @click="selectDate('next-year')"> 下一年 </el-button>
      </el-button-group>
    </template>

    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''" style="text-align: center; line-height: 85px; font-size: 20px" @click="Fun.DateDetail(data)">
        {{ data.day.split("-")[2] }}
        {{ data.isSelected ? "✔️" : "" }}
      </p>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import dayjs from "dayjs";
import { useStore } from "vuex";
import { ElMessage, ElDrawer, ElMessageBox } from "element-plus";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
  Sate: string;
  ClassType: string;
}

const formLabelWidth = "80px";
var timer;
const table = ref(false);
const dialog = ref(false);
const loading = ref(false);
const calendar = ref();
const store = useStore();
const selectDate = (val: string) => {
  calendar.value.selectDate(val);
};
const Data = reactive({
  ClickDateList: computed(() => store.state.FindDate.ClickDateList),
});
const Fun = reactive({
  async DateDetail(date: object) {
    let data = dayjs(date.day).format("YYYY年MM月DD号");
    try {
      await store.dispatch("GETFindDate", { data });
      if (Data.ClickDateList.length !== 0) table.value = true;
      else {
        ElMessage({
          showClose: true,
          message: `无数据可预览`,
          type: "warning",
          center: true,
        });
      }
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
  tableRowClassName({ row, rowIndex }: { row: User; rowIndex: number }) {
    if (rowIndex === 1) {
      return "warning-row";
    } else if (rowIndex === 3) {
      return "success-row";
    }
    return "";
  },
});

const drawerRef = ref<InstanceType<typeof ElDrawer>>();
const onClick = () => {
  drawerRef.value!.close();
};

const handleClose = done => {
  if (loading.value) {
    return;
  }
  ElMessageBox.confirm("Do you want to submit?")
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    })
    .catch(() => {
      // catch error
    });
};

const cancelForm = () => {
  loading.value = false;
  dialog.value = false;
  clearTimeout(timer);
};
</script>

<style lang="less">
@keyframes ElMainAnimation {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.el-calendar {
  height: 600px;
  background-color: #fff !important;
  transition: all 1s;
  animation: ElMainAnimation 0.5s ease-in-out;
}

.is-selected {
  color: #1989fa;
}
</style>
