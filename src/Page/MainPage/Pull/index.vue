<template>
  <!-- 头部下拉 -->
  <div class="pull">
    <div class="pull-home"></div>
    <transition>
      <div class="pull-search" :class="pull_search_flag ? 'pull_search_start' : 'pull-search-end'" v-show="pull_search_flag">
        <div class="w">
          <input type="text" name="" id="" value="" placeholder="搜索内容" />
          <button>图标</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import emitter from "@/utils/mitt";
import { ref } from "vue";
var pull_search_flag = ref(false);
emitter.on("Change_pull_search_start", (data: any) => {
  pull_search_flag.value = data;
});
</script>

<style scoped lang="less">
@keyframes pull_search_start {
  from {
    height: 0;
  }
  to {
    height: 144px;
  }
}
@keyframes pull_search_end {
  from {
    height: 144px;
  }
  to {
    height: 0;
  }
}
.pull_search_start {
  height: 0;
  transition: 0.5s;
  animation: pull_search_start 0.5s both;
}
.pull-search-end {
  height: 0;
  transition: 0.5s;
  animation: pull_search_end 0.5s both;
}
// 头部下拉
.pull {
  float: left;
  width: 100%;
  height: 144px;
  box-sizing: border-box;

  // 下拉搜索
  .pull-search {
    //display: none;
    position: relative;
    width: 100%;
    //height: 144px;
    margin: 0 auto;
    box-sizing: border-box;
    font-size: 0;
    transition: 0.5s;
    //animation: pull_search_start 0.5s both;
    overflow: hidden;
    background-color: #409eff;
    z-index: 999;

    .w {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;

      input {
        width: 1200px;
        height: 42px;
        font-size: 16px;
        text-indent: 10px;
        box-sizing: border-box;
        border: 1px solid #409eff;
        overflow: hidden;

        &:focus {
          outline: 1px solid #409eff;
        }
      }

      button {
        position: absolute;
        top: 2px;
        right: 1px;
        padding: 0;
        width: 100px;
        height: 39px;
        border: 0;
        border-left: 0;
        font-size: 18px;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
