<template>
  <h1>系统日历</h1>
  <el-calendar ref="calendar" class="ElCalendar">
    <template #header="{ date }">
      <span>Custom header content</span>
      <span>{{ date }}</span>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-year')"> 上一年 </el-button>
        <el-button size="small" @click="selectDate('prev-month')"> 上个月 </el-button>
        <el-button size="small" @click="selectDate('today')">今天</el-button>
        <el-button size="small" @click="selectDate('next-month')"> 下个月 </el-button>
        <el-button size="small" @click="selectDate('next-year')"> 下一年 </el-button>
      </el-button-group>
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

<style lang="less" scoped>
h1 {
  text-align: center;
}
.ElCalendar {
  width: 900px;
  height: 600px;
  margin: 0 auto;
}
</style>
