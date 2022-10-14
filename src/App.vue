<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

["contextmenu", "copy"].forEach(function (ev) {
  document.addEventListener(ev, function (ev) {
    ev.preventDefault();
    ev.returnValue = false;
  });
});
const store = useStore();
// TODO  app函数
const APPFun = reactive({
  // TODO  获取菜单栏数据
  GetMenuBarList() {
    store.dispatch("GetMenuBarList");
  },
});
// TODO 获取菜单栏数据
onMounted(async () => {
  try {
    await APPFun.GetMenuBarList();
  } catch (e: Error) {
    ElMessage.closeAll();
    ElMessage({
      showClose: true,
      message: `${e.message}`,
      type: "error",
      center: true,
    });
  }
});
</script>
<style lang="less"></style>
