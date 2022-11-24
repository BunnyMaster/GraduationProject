<template>
  <div class="nav-right">
    <div class="search"><a href="JavaScript:;" @click="ToolFun.ShowSearch()">搜索</a></div>
    <div class="showSystem">
      <div class="showLink">
        <router-link to="/"> 系统演示</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import emitter from "@/utils/mitt";
var pull_search_flag = false;
const ToolFun = reactive({
  ShowSearch() {
    if (pull_search_flag) {
      pull_search_flag = !pull_search_flag;
      emitter.emit("Change_pull_search_start", pull_search_flag);
    } else {
      pull_search_flag = !pull_search_flag;
      emitter.emit("Change_pull_search_start", pull_search_flag);
    }
  },
});
</script>

<style scoped lang="less">
.w {
  width: 1200px;
  margin: 0 auto;
}
p {
  color: #666;
  font-size: 14px;
  text-align: center;
}
.nav-right {
  float: right;

  .search {
    float: left;
    width: 80px;
    height: 100%;
    text-align: center;

    line-height: 64px;
    margin: 0 18px;

    a {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .showSystem {
    position: relative;
    float: right;
    width: 120px;
    height: 64px;
    margin: 0 18px;
    text-align: center;

    .showLink {
      position: absolute;
      display: inline-block;
      width: 100%;
      height: 35px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 35px;
      background-color: #409eff;

      a {
        line-height: 35px;
        color: #fff;
      }
    }
  }
}
</style>
