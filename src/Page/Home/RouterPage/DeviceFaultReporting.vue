<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
    <!--    简要问题描述-->
    <el-form-item label="简述问题" prop="name">
      <el-input v-model="ruleForm.name" placeholder="简要概述问题" />
    </el-form-item>
    <!--    车间标号选择---开始-->
    <el-form-item label="车间编号" prop="region">
      <el-select v-model="ruleForm.region" placeholder="选择设备">
        <el-option v-for="(DeviceReportingItem, DeviceReportingIndex) in DeviceFaultReportingData.GetDeviceFaultReportingList.DevicTtype" :key="DeviceReportingIndex" :label="DeviceReportingItem" :value="DeviceReportingItem" />
      </el-select>
    </el-form-item>
    <el-form-item label="工作区" prop="count">
      <el-select v-model="ruleForm.count" placeholder="选择工作区">
        <el-option v-for="(DeviceReportingItem, DeviceReportingIndex) in DeviceFaultReportingData.GetDeviceFaultReportingList.ErroDescription" :key="DeviceReportingIndex" :label="DeviceReportingItem" :value="DeviceReportingItem" />
      </el-select>
    </el-form-item>
    <!--    车间选择编号---结束-->
    <!--    日期选择-->
    <el-form-item label="选择日期" required>
      <el-col :span="5">
        <el-form-item prop="date1">
          <el-date-picker v-model="ruleForm.date1" type="date" label="选择时间" placeholder="选择年月日" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item prop="date2">
          <el-time-picker v-model="ruleForm.date2" label="选择时间" placeholder="选择具体时间" style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <!--    详细问题描述表-->
    <el-form-item label="详细问题描述" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" placeholder="在此输入内容......" />
    </el-form-item>
    <!--    下方提交和重置-->
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
      <el-button @click="DeviceFaultReportingFun.resetForm(ruleFormRef)"> 重置 </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
const store = useStore();
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  region: "",
  count: "",
  date1: "",
  date2: "",
  desc: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "简要问题描述未填写", trigger: "blur" },
    { min: 3, max: 30, message: "描述需要在3-30字之间", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "请选择所在车间编号",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "请选择所在工作区",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "选择年月日",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "选择具体时间",
      trigger: "change",
    },
  ],
  desc: [{ required: true, message: "详细描述问题原因", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const DeviceFaultReportingData = reactive({
  GetDeviceFaultReportingList: computed(() => store.state.EquipmentManagement.DeviceFaultReportingList),
});
const DeviceFaultReportingFun = reactive({
  //TODO 获取故障上报数据
  GetDeviceFaultReportingData() {
    store.dispatch("DeviceFaultReporting");
  },
  //  TODO 重置表单
  resetForm(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.resetFields();
  },
});
onMounted(async () => {
  try {
    await DeviceFaultReportingFun.GetDeviceFaultReportingData();
    await rules;
  } catch (e) {
    ElMessage.closeAll();
    ElMessage({
      showClose: true,
      message: "Oops, this is a error message.",
      type: "error",
      center: true,
    });
  }
});
</script>
<style scoped lang="less"></style>
