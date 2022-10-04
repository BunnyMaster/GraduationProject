<template>
  <div class="cpus">
    <div id="main"></div>
    <div id="maychar"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"; // 主要
import * as echarts from "echarts";
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
      text: "Large Area Chart",
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
  // 设置配置项
  const option = {
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {},
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

<style lang="less" scoped>
.cpus {
  width: 1600px;
  margin: 50px auto auto auto;
  display: flex;
  justify-content: center;
  justify-items: center;
  #main {
    float: left;
    width: 600px;
    min-width: 400px;
    min-height: 400px;
    // max-height: 500px;
  }

  #maychar {
    float: left;
    width: 600px;
    //max-height: 500px;
    max-height: 400px;
  }
}
</style>
