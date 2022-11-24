<template>
  <div class="footer_bootom">
    <div class="w">
      <Dbnav />
      <yqlj />
      <copyright />
    </div>
  </div>
</template>

<script setup lang="ts">
import Dbnav from "@/Page/MainPage/Footer/dbnav.vue";
import Yqlj from "@/Page/MainPage/Footer/yqlj.vue";
import Copyright from "@/Page/MainPage/Footer/copyright.vue";
</script>

<style scoped lang="less">
.w {
  width: 1200px;
  margin: 0 auto;
}
.footer_bootom {
  float: left;
  width: 100%;
  content: "";
  display: block;
  clear: both;
  padding: 65px 0 45px;
  background-color: #000000;
  box-sizing: border-box;
}
</style>
