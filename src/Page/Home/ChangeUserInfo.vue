<template>
  <el-form ref="ruleFormRef" :model="Data.UserInfo" status-icon label-width="120px" class="demo-ruleForm">
    <!-- 按钮位置 -->
    <div class="SaveOrEdit">
      <el-button type="primary" @click="Fun.ChangeEditFlag" v-if="EditFlag">开始编辑</el-button>
      <el-button type="primary" @click="Fun.ChangeEditFlag" v-else>取消编辑</el-button>
    </div>
    <!--表单信息-->
    <div class="FormDetail">
      <el-form-item label="用户名" prop="UserName" :rules="[{ required: true, message: '请输入用户名' }]">
        <el-input v-model="Data.UserInfo.UserName" type="text" autocomplete="off" :disabled="EditFlag" placeholder="请输入用户名" maxlength="16" :clearable="true" />
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="Email"
        :rules="[
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="Data.UserInfo.Email" type="text" autocomplete="off" :disabled="EditFlag" placeholder="请输入邮箱地址" maxlength="26" :clearable="true" />
      </el-form-item>

      <el-form-item label="类别" prop="Name" :rules="[{ required: true, message: '请输入类别' }]">
        <el-input v-model="Data.UserInfo.Name" type="text" autocomplete="off" :disabled="EditFlag" placeholder="请输入类别" maxlength="10" :clearable="true" />
      </el-form-item>

      <el-form-item label="电话" prop="Phone" :rules="[{ required: true, message: '请输入电话' }]">
        <el-input v-model="Data.UserInfo.Phone" type="text" autocomplete="off" :disabled="EditFlag" placeholder="请输入电话号" maxlength="11" :clearable="true" />
      </el-form-item>

      <el-form-item
        label="年龄"
        prop="Age"
        :rules="[
          { required: true, message: '请输入年龄' },
          { type: 'number', message: '年龄必须是数字' },
        ]"
      >
        <el-input v-model.number="Data.UserInfo.Age" type="text" autocomplete="off" :disabled="EditFlag" placeholder="请输入年龄" maxlength="3" :clearable="true" />
      </el-form-item>

      <el-form-item label="QQ" prop="QQ" :rules="[{ required: true, message: '请输入QQ号' }]">
        <el-input v-model="Data.UserInfo.QQ" type="text" autocomplete="off" :disabled="EditFlag" placeholder="请输入QQ号" maxlength="10" :clearable="true" />
      </el-form-item>

      <el-form-item label="微信" prop="WeChat" :rules="[{ required: true, message: '请输入微信号' }]">
        <el-input v-model="Data.UserInfo.WeChat" type="text" autocomplete="off" :disabled="EditFlag" placeholder="请输入微信号" maxlength="26" :clearable="true" />
      </el-form-item>

      <el-form-item label="密码" prop="UserPwd" :rules="[{ required: true, message: '请输入密码' }]">
        <el-input v-model="Data.UserInfo.UserPwd" type="password" autocomplete="off" :disabled="EditFlag" show-password placeholder="请输入密码" maxlength="16" :clearable="true" />
      </el-form-item>

      <el-form-item label="头像" prop="HeaderImages" v-if="EditFlag">
        <div class="demo-type">
          <el-avatar :size="60" :src="Data.UserInfo.HeaderImage" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </div>
      </el-form-item>

      <el-form-item label="上传头像" prop="HeaderImage" v-else>
        <UploadHeaderImages :EditFlag="EditFlag" />
      </el-form-item>

      <!--      表单操作-->
      <el-form-item>
        <el-button type="primary" @click="FormTool.submitForm(ruleFormRef)" :disabled="EditFlag">保存并提交</el-button>
        <el-button @click="FormTool.resetForm(ruleFormRef)" :disabled="EditFlag">重置 </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { FormInstance, ElMessage } from "element-plus";
import UploadHeaderImages from "@/components/upload/UploadHeaderImages.vue";
import { useStore } from "vuex";
const ruleFormRef = ref<FormInstance>();
const EditFlag: boolean = ref(true);

const errorHandler = () => true;
const store = useStore();
const Data = reactive({
  UserInfo: computed(() => store.state.Login.UserInfo),
});
const Fun = reactive({
  ChangeEditFlag() {
    EditFlag.value = !EditFlag.value;
  },
});

const FormTool = reactive({
  submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.validate(async valid => {
      if (valid) {
        try {
          await store.dispatch("ChangeUserInfo", Data.UserInfo);
          ElMessage({
            showClose: true,
            message: "提交成功",
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
        ElMessage({
          showClose: true,
          message: "提交失败",
          type: "error",
          center: true,
        });
        return false;
      }
    });
  },
  resetForm(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.resetFields();
  },
});
</script>
<style lang="less" scoped>
.el-form {
  float: left;
  width: 100%;
  height: 100%;
  min-height: 800px;
  .SaveOrEdit {
    float: right;
  }
  //  表单信息
  .FormDetail {
    float: left;
    width: 100%;
    height: 100%;
    min-height: 800px;
    margin-top: 30px;
  }
}
</style>
