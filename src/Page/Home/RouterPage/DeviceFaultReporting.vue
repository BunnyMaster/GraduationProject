<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" style="width: 100%" class="demo-ruleForm" :size="formSize" status-icon>
    <!--    简要问题描述-->
    <el-form-item label="简述问题" prop="title">
      <el-input v-model="ruleForm.title" placeholder="简要概述问题" />
    </el-form-item>
    <el-form-item label="提交人姓名" prop="SubName">
      <el-input v-model="ruleForm.SubName" placeholder="输入姓名" style="width: 166px" />
    </el-form-item>
    <el-form-item label="所在城市" prop="City">
      <el-input v-model="ruleForm.City" placeholder="请输入所在城市" />
    </el-form-item>
    <el-form-item label="详细地址" prop="Address">
      <el-input v-model="ruleForm.Address" placeholder="请输入详细地址" />
    </el-form-item>
    <el-form-item label="输入设备名称" prop="DeviceName">
      <el-input v-model="ruleForm.DeviceName" placeholder="输入设备名称" style="width: 166px" />
    </el-form-item>
    <!--    车间标号选择---开始-->
    <el-form-item label="选择设备" prop="WorkShopNumber">
      <el-select v-model="ruleForm.WorkShopNumber" placeholder="选择设备">
        <el-option
          v-for="(DeviceReportingItem, DeviceReportingIndex) in DeviceFaultReportingData.GetDeviceFaultReportingList.DevicTtype"
          :key="DeviceReportingIndex"
          :label="DeviceReportingItem"
          :value="DeviceReportingItem"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="选择生产线" prop="WorkAddress">
      <el-select v-model="ruleForm.WorkAddress" placeholder="选择生产线">
        <el-option
          v-for="(DeviceReportingItem, DeviceReportingIndex) in DeviceFaultReportingData.GetDeviceFaultReportingList.ErroDescription"
          :key="DeviceReportingIndex"
          :label="DeviceReportingItem"
          :value="DeviceReportingItem"
        />
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
    <el-form-item label="详细问题描述" prop="detail">
      <el-input v-model="ruleForm.detail" type="textarea" placeholder="在此输入内容......" />
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
import dayjs from "dayjs";
const store = useStore();
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  title: "",
  SubName: "",
  WorkShopNumber: "",
  WorkAddress: "",
  City: "",
  Address: "",
  date1: "",
  date2: "",
  detail: "",
  DeviceName: "",
});

const rules = reactive<FormRules>({
  title: [
    { required: true, message: "简要问题描述未填写", trigger: "blur" },
    { min: 3, max: 30, message: "描述需要在3-30字之间", trigger: "blur" },
  ],
  SubName: [{ required: true, message: "提交人姓名", trigger: "blur" }],
  City: [{ required: true, message: "所在城市", trigger: "blur" }],
  Address: [{ required: true, message: "详细地址", trigger: "blur" }],
  WorkShopNumber: [
    {
      required: true,
      message: "请选择选择设备",
      trigger: "change",
    },
  ],
  WorkAddress: [
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
  detail: [{ required: true, message: "详细描述问题原因", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields: any) => {
    if (valid) {
      ElMessage.closeAll();
      let data = {
        title: ruleForm.title,
        Name: ruleForm.SubName,
        WorkShopNumber: ruleForm.WorkShopNumber,
        WorkAddress: ruleForm.WorkAddress,
        Time: dayjs(fields).format("YYYY年MM月DD号 HH:mm:ss "),
        detail: ruleForm.detail,
        City: ruleForm.City,
        DeviceName: ruleForm.DeviceName,
        Address: ruleForm.Address,
      };

      try {
        store.dispatch("ReqRepairList", data);
        ElMessage({
          showClose: true,
          message: `提交成功!!!`,
          type: "success",
          center: true,
        });
      } catch (e) {
        ElMessage({
          showClose: true,
          message: `${e.message}`,
          type: "error",
          center: true,
        });
      }
    } else {
      ElMessage.closeAll();
      ElMessage({
        showClose: true,
        message: `错误,信息不完整`,
        type: "error",
        center: true,
      });
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
