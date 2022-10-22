<template>
  <!--  对话框-->
  <el-dialog v-model="dialogVisible" title="删除警告" width="50%" draggable>
    <h1 style="margin: 10px; text-align: center; color: red">数据不易,这只会在网页中移出，重新刷新后会显示</h1>
    <el-table :data="Data.DeleteRepairBillLsit" style="width: 100%">
      <template #empty>
        <el-empty>
          <template #description> 暂无数据</template>
        </el-empty>
      </template>
      <el-table-column fixed prop="id" label="id号" align="center" width="100" />
      <el-table-column prop="Time" label="时间" width="200" align="center">
        <template #default="scope">
          <span style="justify-content: center">{{ scope.row.Time.replace("T", " ").replace(".000Z", "") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Name" label="姓名" width="120" align="center" />
      <el-table-column prop="State" label="状态" width="120" align="center">
        <template #default="scope">
          <el-tag :type="Fun.RepairSate(scope.row.State)" disable-transitions="disable-transitions">
            {{ scope.row.State }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="City" label="城市" width="120" align="center" />
      <el-table-column prop="Address" label="地址" width="400" align="center" />
      <el-table-column prop="DeviceName" label="压缩" width="120" align="center" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="Fun.SureDeleteData(Data.DeleteRepairBillLsit)"> 确认删除 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-container>
    <!--    TODO 头部-->
    <el-header>
      <el-icon :size="22" color="#333"> <HomeFilled /></el-icon>
      <h1>{{ $route.meta.title }}</h1>
    </el-header>
    <!--    TODO 身子-->
    <el-main>
      <!--  TODO   头像-->
      <div class="demo-type demo-Header">
        <div class="HeaderCountent">
          <el-avatar :size="100" :src="Data.UserInfoLIst.HeaderImage" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <h1>{{ Data.UserInfoLIst.Name }}</h1>
          <!--     TODO     报修数量-->
          <div class="RepairNumber">
            <h1>设备报修数量</h1>
            <div class="demo-progress">
              <el-progress :percentage="progress_nodo ? progress_nodo : 100" :format="format" :stroke-width="16" />
              <el-progress :percentage="progress_error + progress_warning ? progress_error + progress_warning : 100" :format="format" status="warning" :stroke-width="16" />
              <el-progress :percentage="progress_success ? progress_success : 100" :format="format" status="success" :stroke-width="16" />
              <el-progress :percentage="progress_warning ? progress_warning : 100" :format="format" status="warning" :stroke-width="16" />
              <el-progress :percentage="progress_error ? progress_error : 100" :format="format" status="exception" :stroke-width="16" />
            </div>
          </div>
          <!--TODO 待处理的表单-->
          <div class="WaitTable">
            <h1>设备待处理</h1>
            <el-table :data="Data.RepairBillLsit" style="width: 100%">
              <template #empty>
                <el-empty>
                  <template #description> 暂无数据</template>
                  <el-button type="primary" @click="Fun.Refshash()">刷新</el-button>
                </el-empty>
              </template>
              <el-table-column fixed prop="id" label="id号" align="center" width="100" />
              <el-table-column prop="Time" label="时间" width="200" align="center">
                <template #default="scope">
                  <span style="justify-content: center">{{ scope.row.Time.replace("T", " ").replace(".000Z", "") }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="姓名" width="120" align="center" />
              <el-table-column prop="State" label="状态" width="120" align="center">
                <template #default="scope">
                  <el-tag :type="Fun.RepairSate(scope.row.State)" disable-transitions="disable-transitions">
                    {{ scope.row.State }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="City" label="城市" width="120" align="center" />
              <el-table-column prop="Address" label="地址" width="400" align="center" />
              <el-table-column prop="DeviceName" label="压缩" width="120" align="center" />
              <el-table-column :fixed="'right'" label="操作" width="120" align="center">
                <template #default="scope">
                  <!--                  <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>-->
                  <el-button link type="primary" size="small" v-if="scope.row.State !== '完成'" @click="Fun.DeleteState(scope.row, scope)">删除</el-button>
                  <el-button link type="success" size="small" v-else disabled>已经完成啦</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--      TODO 用户详细信息-->
          <div class="UserDetail">
            <el-descriptions title="用户详细信息" direction="vertical" :column="16" border>
              <el-descriptions-item align="center" label="创建ID">{{ Data.UserInfoLIst.id }}</el-descriptions-item>
              <el-descriptions-item align="center" label="创建时间">{{ Data.UserInfoLIst.CreateTime.replace("T", " ").replace(".000Z", "") }}</el-descriptions-item>
              <el-descriptions-item align="center" label="用户名" :span="2">{{ Data.UserInfoLIst.UserName }}</el-descriptions-item>
              <el-descriptions-item align="center" label="年龄" :span="2">{{ Data.UserInfoLIst.Age }}</el-descriptions-item>
              <el-descriptions-item align="center" label="邮箱">{{ Data.UserInfoLIst.Email }}</el-descriptions-item>
              <el-descriptions-item align="center" label="电话" :span="2">{{ Data.UserInfoLIst.Phone }}</el-descriptions-item>
              <el-descriptions-item align="center" label="QQ" :span="2">{{ Data.UserInfoLIst.QQ }}</el-descriptions-item>
              <el-descriptions-item align="center" label="微信" :span="2">{{ Data.UserInfoLIst.WeChat }}</el-descriptions-item>
              <el-descriptions-item align="center" label="属性">
                <el-tag size="small">{{ Data.UserInfoLIst.Name }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
      <!--      TODO 图像-->
      <div class="cpus">
        <div id="main"></div>
        <div id="maychar"></div>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { HomeFilled } from "@element-plus/icons-vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import * as echarts from "echarts";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
const store = useStore();

const errorHandler = () => true;
const dialogVisible = ref(false);
const format = (percentage: any) => (percentage === 100 ? "全部完成" : `${percentage}%`);
const Data = reactive({
  UserInfoLIst: computed(() => store.state.Login.UserInfo || [{}]),
  RepairBillLsit: store.state.Login.RepairBill || {},
  DeleteRepairBillLsit: [],
});
var progress_success = computed(() => {
  let flag = 0;
  Data.RepairBillLsit.forEach((Item: any) => {
    if (Item.State === "完成") flag++;
  });
  let count: number = parseInt(Data.RepairBillLsit.length / flag + "");
  if (count) return count;
});
var progress_warning = computed(() => {
  let flag = 0;
  Data.RepairBillLsit.forEach((Item: any) => {
    if (Item.State === "警告") flag++;
  });
  let count: number = parseInt(Data.RepairBillLsit.length / flag + "");
  if (count) return count;
});
var progress_error = computed(() => {
  let flag = 0;
  Data.RepairBillLsit.forEach((Item: any) => {
    if (Item.State === "错误") flag++;
  });
  let count: number = parseInt(Data.RepairBillLsit.length / flag + "");
  if (count) return count;
});
var progress_nodo = computed(() => {
  let flag = 0;
  Data.RepairBillLsit.forEach((Item: any) => {
    if (Item.State === "未完成") flag++;
  });
  let count: number = parseInt(Data.RepairBillLsit.length / flag + "");
  if (count) return count;
});
const Fun = reactive({
  // TODO 刷新
  Refshash() {
    Fun.GetUserInfo();
  },
  // TODO 设置用户信息
  async SetUserInfo() {
    localStorage.setItem("USERINFO", JSON.stringify(Data.UserInfoLIst));
  },
  //  TODO 获取用户信息
  async GetUserInfo() {
    let localInfo: any = localStorage.getItem("USERINFO");
    try {
      await store.dispatch("GetLoginInfo", JSON.parse(localInfo).UserName);
      await store.dispatch("GetRepairBill", JSON.parse(localInfo).UserName);
    } catch (e) {
      ElMessage.closeAll();
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
  //   TODO 未修状态
  RepairSate(state: string) {
    let flag = "";
    let warning = 0;
    let success = 0;
    let exception = 0;

    switch (state) {
      case "完成":
        flag = "success";
        success++;
        break;
      case "警告":
        flag = "warning";
        warning++;
        break;
      case "错误":
        flag = "danger";
        exception++;
        break;
      case "未修":
        flag = "";
        break;
    }
    return flag;
  },
  //   TODO 删除状态栏
  DeleteState(StateRow: object, State: object) {
    dialogVisible.value = true;
    let list = [StateRow];
    Data.DeleteRepairBillLsit = list;
  },
  //  TODO 确认删除列表
  SureDeleteData(DeleteRepairBillLsit: string[]) {
    ElMessage.closeAll();
    try {
      ElMessage({
        showClose: true,
        message: "删除成功,仅在网页生效",
        type: "success",
        center: true,
      });
      let list = Data.RepairBillLsit.filter((Item: any) => Item.id !== DeleteRepairBillLsit[0].id);
      Data.RepairBillLsit = list;
      dialogVisible.value = false;
    } catch (e) {
      ElMessage({
        showClose: true,
        message: "删除失败",
        type: "error",
        center: true,
      });
    }
  },
});
onMounted(() => {
  change();
  changetype();
  // Fun.SetUserInfo();
  Fun.GetUserInfo();
  watch(
    () => store.state.Login.RepairBill,
    () => (Data.RepairBillLsit = store.state.Login.RepairBill),
    { deep: true },
  );
});
// 基本柱形图
const change = () => {
  const chartBox = echarts.init(document.querySelector("#main")); // 主要
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];

  let data = [Math.random() * 300];

  for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }

  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "工单维修次数表",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: "Fake Data",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        data: data,
      },
    ],
  };
  chartBox.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    chartBox.resize();
  });
};
// 折线图
const changetype = () => {
  // 获取组件实例
  const machart = echarts.init(document.getElementById("maychar"));
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  // 设置配置项
  const option = {
    title: {
      left: "center",
      text: "业绩维修记录",
    },
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
      type: "category",
      boundaryGap: false,
    },
    yAxis: {},
    tooltip: {
      trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "line", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true,
          excludeComponents: ["toolbox"],
          pixelRatio: 2,
        },
      },
    },
    series: [
      {
        data: [10, 22, 28, 43, 49],
        type: "line",
        stack: "x",
      },
      {
        data: [5, 4, 3, 5, 10],
        type: "line",
        stack: "x",
      },
    ],
  };
  // 复制
  machart.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    machart.resize();
  });
};
</script>

<style scoped lang="less">
// TODO 头部
.el-header {
  background-color: #ccc;
  overflow: hidden;
  .el-icon {
    float: left;
    margin-top: 20px;
    margin-right: 20px;
  }
  h1 {
    float: left;
    line-height: 60px;
  }
}
//TODO 身子
.el-main {
  margin-top: -10px;
  background-color: transparent;
  //头像
  .demo-Header {
    position: relative;
    float: left;
    width: 100%;
    height: 400px;
    background-color: #fff;
    .HeaderCountent {
      width: 90%;
      height: 250px;
      border-bottom: 2px solid #ccc;
      padding-bottom: 10px;
      margin: 5px auto;
      box-sizing: border-box;
      .RepairNumber {
        position: relative;
        float: left;
        width: 400px;
        height: 250px;
        margin-left: 100px;
        overflow: hidden;
        h1 {
          width: 100%;
          height: 50px;
          margin-top: 0;
          margin-left: 0;
          line-height: 50px;
          text-indent: 20px;
          font-size: 22px;
          border-bottom: 2px solid #cccccc;
          box-sizing: border-box;
        }
        .demo-progress {
          position: absolute;
          width: 100%;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 50px 0 0 10px;
        }
      }
      .el-avatar {
        float: left;
        height: 100px;
        margin-top: 75px;
      }
      h1 {
        float: left;
        line-height: 250px;
        margin-left: 20px;
      }
      //  详细信息
      .UserDetail {
        margin-top: 10px;
        .el-descriptions {
          float: left;
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
}
//进度条
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
//待处理表单
.WaitTable {
  overflow: hidden;
  float: left;
  width: 700px;
  height: 240px;
  margin-left: 30px;
  h1 {
    width: 100%;
    height: 50px;
    margin-top: 0;
    margin-left: 0;
    line-height: 50px !important;
    text-indent: 20px;
    font-size: 22px;
    border-bottom: 2px solid #cccccc;
    box-sizing: border-box;
  }
  .el-table {
    height: 200px;
  }
}
.cpus {
  float: left;
  width: 100%;
  height: 350px;
  margin: 10px auto auto auto;
  display: flex;
  justify-content: center;
  justify-items: center;
  #main {
    float: left;
    width: 600px;
    height: 350px;
  }

  #maychar {
    float: left;
    width: 600px;
    height: 350px;
  }
}
</style>
