<template>
  <!-- Form -->
  <el-dialog
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    align-center
    :lock-scroll="true"
    :draggable="true"
    v-model="Dialog_AddItemData.dialogFormVisible"
    :title="`${Dialog_AddItemData.DialogTitle}-${$route.meta.title}`"
  >
    <el-form :model="Dialog_AddItemData">
      <h1 style="text-align: center; margin-bottom: 16px">请添请加</h1>
      <!--          TODO 选择框中的设备列表-->
      <el-form-item label="设备列表" :label-width="Dialog_AddItemData.formLabelWidth">
        <el-select v-model="Dialog_AddItemData.region" placeholder="请选择设备">
          <el-option v-for="(LabelItem, LableIndex) in Dialog_AddItemData.DeviceFaultReportingList.DevicTtype" :key="LableIndex" :label="LabelItem" :value="LabelItem" />
        </el-select>
      </el-form-item>
      <el-form-item v-for="(tableItem, tableIndex) in tableList" :key="tableIndex" :label="tableItem" :label-width="Dialog_AddItemData.formLabelWidth">
        <el-input v-model="Dialog_AddItemData.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Dialog_AddItemFun.isShowDialog(false)">返回</el-button>
        <el-button type="primary" @click="Dialog_AddItemFun.isShowDialog(true)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, onMounted, reactive, ref, watch } from "vue";

import { useStore } from "vuex";
const props = defineProps(["DialogTitle", "dialogFormVisible", "tableList"]);
const emit = defineEmits(["AddItem"]);
const store = useStore();
const Dialog_AddItemData = reactive({
  name: "",
  region: "",
  delivery: false,
  dialogFormVisible: false, // 是否显示弹出框
  formLabelWidth: "140px",
  DeviceFaultReportingList: computed(() => store.state.EquipmentManagement.DeviceFaultReportingList),
  DialogTitle: computed(() => props.DialogTitle),
});

const Dialog_AddItemFun = reactive({
  //  TODO 获取DeviceFaultReportingList设备列表
  GetDeviceFaultReportingList() {
    store.dispatch("DeviceFaultReporting");
  },
  //  TODO 修改父组件中是否隐藏Dialog
  isShowDialog(flag: boolean) {
    emit("AddItem", flag);
    Dialog_AddItemData.dialogFormVisible = props.dialogFormVisible;
    console.log(Dialog_AddItemData.name);
  },
});
watch(
  () => props.dialogFormVisible,
  () => {
    Dialog_AddItemData.dialogFormVisible = props.dialogFormVisible;
  },
  { deep: true },
);
onMounted(() => {
  Dialog_AddItemFun.GetDeviceFaultReportingList();
});
</script>
<style scoped lang="less"></style>
