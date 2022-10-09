<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header /></el-header>
      <el-container>
        <el-aside width="auto"><MenuBar /></el-aside>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import MenuBar from "@/Page/Home/MenuBar.vue";
import Header from "@/components/Header/index.vue";
import RouterPage from "@/Page/Home/RouterPage/RouterPage.vue";
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
.el-header {
  --el-header-padding: 0 0;
  height: 70px;
}
.el-main {
  background-color: #d9ecff2d;
  transition: all 1s;
  animation: ElMainAnimation 0.5s ease-in-out;
}

.el-table {
  background-color: #d9ecff2d;
  transition: all 1s;
  animation: ElMainAnimation 0.5s ease-in-out;
}
</style>
