<template>
  <div class="dynamicSate">
    <div class="main"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"; // 主要
import * as echarts from "echarts";
import Calendar from "./Calendar.vue";
const change = () => {
  const data = [];
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
  }
  const myChart = echarts.init(document.querySelector(".main"));
  var option = {
    xAxis: {
      max: "dataMax",
    },
    yAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2, // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: "X",
        type: "bar",
        data: data,
        label: {
          show: true,
          position: "right",
          valueAnimation: true,
        },
      },
    ],
    legend: {
      show: true,
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };
  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
      } else {
        data[i] += Math.round(Math.random() * 200);
      }
    }
    myChart.setOption(option, {
      series: [
        {
          type: "bar",
          data,
        },
      ],
    });
    // 复制
    // 根据页面大小自动响应图表大小
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  setTimeout(function () {
    run();
  }, 0);
  setInterval(function () {
    run();
  }, 3000);
};
onMounted(() => {
  change();
});
</script>

<style scoped lang="less">
.dynamicSate {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  width: 1600px;
  margin: 0 auto;

  .main {
    width: 600px;
    height: 400px;
    margin-top: 120px;
  }
}
</style>
