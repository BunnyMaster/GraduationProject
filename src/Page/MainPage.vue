<template>
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
          <el-avatar :size="100" src="https://empty" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <h1>普通用户</h1>
          <!--     TODO     报修数量-->
          <div class="RepairNumber">
            <h1>设备报修数量</h1>
            <div class="demo-progress">
              <el-progress :percentage="50" />
              <el-progress :percentage="100" :format="format" />
              <el-progress :percentage="100" status="success" />
              <el-progress :percentage="100" status="warning" />
              <el-progress :percentage="50" status="exception" />
            </div>
          </div>
          <!--TODO 待处理的表单-->
          <div class="WaitTable">
            <h1>设备待处理</h1>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column fixed prop="date" label="Date" width="150" />
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="state" label="状态" width="120" />
              <el-table-column prop="city" label="城市" width="120" />
              <el-table-column prop="address" label="地址" width="600" />
              <el-table-column prop="zip" label="压缩" width="120" />
              <el-table-column :fixed="'right'" label="Operations" width="120">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                  <el-button link type="primary" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--      TODO 用户详细信息-->
          <div class="UserDetail">
            <el-descriptions title="用户详细信息" direction="vertical" :column="16" border>
              <el-descriptions-item align="center" label="创建ID">5asd565adas5</el-descriptions-item>
              <el-descriptions-item align="center" label="创建时间">2022-10-10</el-descriptions-item>
              <el-descriptions-item align="center" label="用户名" :span="2">UserName</el-descriptions-item>
              <el-descriptions-item align="center" label="年龄" :span="2">16</el-descriptions-item>
              <el-descriptions-item align="center" label="邮箱">18100000000@qq.com</el-descriptions-item>
              <el-descriptions-item align="center" label="电话" :span="2">180123456789</el-descriptions-item>
              <el-descriptions-item align="center" label="QQ" :span="2">1319990015</el-descriptions-item>
              <el-descriptions-item align="center" label="微信" :span="2">65sasas223asd</el-descriptions-item>
              <el-descriptions-item align="center" label="属性">
                <el-tag size="small">School</el-tag>
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
import { onMounted } from "vue";
import * as echarts from "echarts";
const errorHandler = () => true;

const format = percentage => (percentage === 100 ? "Full" : `${percentage}%`);
const handleClick = () => {
  console.log("click");
};
onMounted(() => {
  change();
  changetype();
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
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];
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
