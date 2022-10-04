<template>
  <div class="MenuBox">
    <!--    开关-->
    <el-radio-group v-model="isCollapse" style="margin-bottom: 10px">
      <el-switch v-model="switchisCollapse" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" @click="ChangeisCollapse" />
    </el-radio-group>
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <!--      下面的-->
      <el-menu-item index="1">
        <el-icon><IconMenu /></el-icon>
        <template #title>生产管理</template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>工艺管理</span>
        </template>
        <el-menu-item-group>
          <template #title><span>档案</span></template>
          <el-menu-item index="1-1">工序档案</el-menu-item>
          <el-menu-item index="1-2">物料档案</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="工艺分类"> </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>工艺</span></template>
          <el-menu-item index="1-3">产品工艺</el-menu-item>
          <el-menu-item index="1-4-1">工艺处理</el-menu-item>
          <el-menu-item index="1-4-1">工艺模型</el-menu-item>
          <el-menu-item index="1-4-1">检验模型</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <!--      <el-menu-item index="3" disabled>-->
      <el-menu-item index="3">
        <el-icon><document /></el-icon>
        <template #title>生产执行</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>设备管理</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><setting /></el-icon>
        <template #title>库存管理</template>
      </el-menu-item>
      <el-menu-item index="6">
        <el-icon><setting /></el-icon>
        <template #title>统计分析</template>
      </el-menu-item>
      <el-menu-item index="7">
        <el-icon><setting /></el-icon>
        <template #title>系统设置</template>
      </el-menu-item>
      <el-menu-item index="7">
        <el-icon><setting /></el-icon>
        <template #title>系统设置</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Setting, Location, Document } from "@element-plus/icons-vue";
var isCollapse = ref(true);
const switchisCollapse = ref(false);
const ChangeisCollapse = () => {
  isCollapse.value = !switchisCollapse.value;
};
const handleOpen = (key: string, keyPath: string[]) => {
  // sCloseOrOpen.value = false;
};
const handleClose = (key: string, keyPath: string[]) => {
  // sCloseOrOpen.value = true;
};
</script>

<style lang="less">
.Switch {
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}

.el-menu {
  height: 100%;
}

.el-main {
  background-color: gainsboro;
}

.el-aside,
.el-container,
.common-layout,
#app,
body,
html {
  height: 100%;
  box-sizing: border-box;
}
.MenuBox {
  float: left;
  width: 200px;
  height: 100%;
  box-sizing: border-box;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
}
</style>
