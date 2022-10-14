<template>
  <el-calendar>
    <template #header="{ date }">
      <span>XXXX公司系统日历</span>
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
      <p :class="data.isSelected ? 'is-selected' : ''" style="text-align: center; line-height: 85px; font-size: 20px">
        {{ data.day.split("-")[2] }}
        {{ data.isSelected ? "✔️" : "" }}
      </p>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const calendar = ref();
const selectDate = (val: string) => {
  calendar.value.selectDate(val);
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
  background-color: #fff !important;
  transition: all 1s;
  animation: ElMainAnimation 0.5s ease-in-out;
}

.is-selected {
  color: #1989fa;
}
</style>
