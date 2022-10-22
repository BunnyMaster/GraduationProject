<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

["contextmenu", "copy"].forEach(function (ev) {
  document.addEventListener(ev, function (ev) {
    ev.preventDefault();
    ev.returnValue = false;
  });
});
const store = useStore();
const router = useRouter();
// TODO  app函数
const APPFun = reactive({
  // TODO  获取菜单栏数据
  GetMenuBarList() {
    store.dispatch("GetMenuBarList");
  },
});
// TODO 获取菜单栏数据
onMounted(async () => {
  if (!localStorage.getItem("USERINFO")) {
    router.push("/login");
  }
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
<style lang="less">
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
