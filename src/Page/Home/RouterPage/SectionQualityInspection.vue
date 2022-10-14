<template>
  <HomeTableCommon :Seach_ADDisShow="false">
    <el-main>
      <!--    TODO  时间显示-->
      <div class="TimeSelectHeader">
        <div class="demo-date-picker TimePicker1">
          <h5>开始时间:</h5>
          <el-date-picker v-model="Data.StarTimeValue" style="margin-left: 30px" type="date" placeholder="请输入日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD">
            <template #default="cell">
              <div class="cell" :class="{ current: cell.isCurrent }">
                <span class="text">{{ cell.text }}</span>
                <span v-if="isHoliday(cell)" class="holiday" />
              </div>
            </template>
          </el-date-picker>
        </div>
        <div class="demo-date-picker TimePicker2">
          <h5>结束时间:</h5>
          <el-date-picker v-model="Data.EndTimeValue" type="date" placeholder="请输入日期" style="margin-left: 30px" format="YYYY/MM/DD" value-format="YYYY-MM-DD">
            <template #default="cell">
              <span>结束时间:</span>
              <div class="cell" :class="{ current: cell.isCurrent }">
                <span class="text">{{ cell.text }}</span>
                <span v-if="isHoliday(cell)" class="holiday" />
              </div>
            </template>
          </el-date-picker>
        </div>
      </div>
      <div class="EchatrsShow1"></div>
      <div class="EchatrsShow2"></div>
    </el-main>
  </HomeTableCommon>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import dayjs from "dayjs";
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import * as echarts from "echarts";

const holidays = ["2021-10-01", "2021-10-02", "2021-10-03", "2021-10-04", "2021-10-05", "2021-10-06", "2021-10-07"];

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format("YYYY-MM-DD"));
};
const Data = reactive({
  StarTimeValue: "",
  EndTimeValue: "",
});
const Fun = reactive({
  // TODO 显示第一个
  ShowEcharts1() {
    let myChart = echarts.init(document.querySelector(".EchatrsShow1"));
    let option: object = {
      xAxis: {
        type: "category",
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "30%"],
      },
      visualMap: {
        type: "piecewise",
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [
          {
            gt: 1,
            lt: 3,
            color: "rgba(0, 0, 180, 0.4)",
          },
          {
            gt: 5,
            lt: 7,
            color: "rgba(0, 0, 180, 0.4)",
          },
        ],
      },
      series: [
        {
          type: "line",
          smooth: 0.6,
          symbol: "none",
          lineStyle: {
            color: "#5470C6",
            width: 5,
          },
          markLine: {
            symbol: ["none", "none"],
            label: { show: false },
            data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
          },
          areaStyle: {},
          data: [
            ["2019-10-10", 200],
            ["2019-10-11", 560],
            ["2019-10-12", 750],
            ["2019-10-13", 580],
            ["2019-10-14", 250],
            ["2019-10-15", 300],
            ["2019-10-16", 450],
            ["2019-10-17", 300],
            ["2019-10-18", 100],
          ],
        },
      ],
    };
    // 绘制图表
    myChart.setOption(option);
  },
  // TODO 显示第二个
  ShowEcharts2() {
    let myChart = echarts.init(document.querySelector(".EchatrsShow2"));
    let option: object = {
      dataset: [
        {
          dimensions: ["name", "age", "profession", "score", "date"],
          source: [
            ["Hannah Krause", 41, "Engineer", 314, "2011-02-12"],
            ["Zhao Qian", 20, "Teacher", 351, "2011-03-01"],
            ["Jasmin Krause ", 52, "Musician", 287, "2011-02-14"],
            ["Li Lei", 37, "Teacher", 219, "2011-02-18"],
            ["Karle Neumann", 25, "Engineer", 253, "2011-04-02"],
            ["Adrian Groß", 19, "Teacher", "-", "2011-01-16"],
            ["Mia Neumann", 71, "Engineer", 165, "2011-03-19"],
            ["Böhm Fuchs", 36, "Musician", 318, "2011-02-24"],
            ["Han Meimei", 67, "Engineer", 366, "2011-03-12"],
          ],
        },
        {
          transform: {
            type: "sort",
            config: { dimension: "score", order: "desc" },
          },
        },
      ],
      xAxis: {
        type: "category",
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: {},
      series: {
        type: "bar",
        encode: { x: "name", y: "score" },
        datasetIndex: 1,
      },
    };

    // 绘制图表
    myChart.setOption(option);
  },
});
onMounted(() => {
  Fun.ShowEcharts1();
  Fun.ShowEcharts2();
});
</script>
<style scoped lang="less">
.TimePicker1 {
  display: inline-block;
  margin-left: 30px;
  h5 {
    display: inline-block;
    font-size: 16px;
    margin-right: -20px;
  }
  span {
    margin-right: 0;
  }
}
.TimePicker2 {
  display: inline-block;
  margin-left: 30px;
  h5 {
    display: inline-block;
    font-size: 16px;
    margin-right: -20px;
  }
}
.el-header {
  margin: 0 auto;
  width: 100%;
}
.el-main {
  background-color: transparent;
}
.EchatrsShow1 {
  float: left;
  width: 600px;
  height: 400px;
}
.EchatrsShow2 {
  float: left;
  width: 600px;
  height: 400px;
  margin-left: 50px;
}

.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: #626aef;
  color: #fff;
}
.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
