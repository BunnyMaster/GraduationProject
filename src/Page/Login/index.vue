<template>
  <div class="out" ref="out">
    <el-page-header @back="goBack" style="color: #409eff; font-size: 20px">
      <template #content>
        <span class="text-large font-600 mr-3" style="color: #409eff; cursor: default"> 先去首页预览 </span>
      </template>
    </el-page-header>
    <!-- 登录 -->
    <div class="login_box">
      <div class="top">
        <!-- 左边的 -->
        <div class="top-left" :class="{ 'top-active': LoginData.LoginActive }" @click="LoginFun.ChangeLogin(true)">登录</div>
        <!-- </div>右边的 -->
        <div class="top-right" :class="{ 'top-active': !LoginData.LoginActive }" @click="LoginFun.ChangeLogin(false)">注册</div>
      </div>
      <div class="bottom">
        <!-- 登录内容 -->
        <div class="login_content" :class="{ LoginShowActive: !LoginData.LoginActive }">
          <!-- 登录 -->
          <div class="UserName">
            <label for="LoginName">用户名</label>
            <input
              type="text"
              name="text"
              v-model="Login.UserName"
              id="LoginName"
              placeholder="请输入用户名/邮箱/手机号"
              @blur="LoginFun.InputUserNameIsTrue()"
              @input="LoginFun.InputUserNameIsTrue()"
            />
            <el-icon :size="16" color="#fff" v-show="LoginData.LoginUserNameInput" @click="LoginFun.ClearInput()">
              <CloseBold />
            </el-icon>
            <span v-if="LoginData.LoginNameInfo"> 用户名必须是邮箱或者手机号位数在6~32之间 </span>
          </div>
          <!-- 密码 -->
          <div class="UserPwd">
            <label for="LoginPassword">密码</label>
            <input
              :type="LoginData.LoginUserPwdIsShow ? 'password' : 'text'"
              name="password"
              id="LoginPassword"
              placeholder="请输入8-16位密码"
              v-model="Login.UserPwd"
              @input="LoginFun.InputPwdIsTrue()"
              @blur="LoginFun.InputPwdIsTrue()"
            />
            <br />
            <span v-if="LoginData.LoginPwdInfo">密码必须在8-16位之间</span>
            <!--            密码显示-->
            <el-icon :size="16" color="#fff" v-if="LoginData.LoginUserPwdIsShow" @click="LoginData.LoginUserPwdIsShow = false">
              <Hide />
            </el-icon>
            <!--            密码隐藏-->
            <el-icon :size="16" color="#fff" v-else @click="LoginData.LoginUserPwdIsShow = true">
              <View />
            </el-icon>
          </div>
          <el-button id="LoginBtn" type="primary" :disabled="LoginData.LoginDisable" @click="LoginFun.UserLogin()"> 登录 </el-button>
        </div>
        <!-- 注册内容 -->
        <div class="register_content" :class="{ LoginShowActive: LoginData.LoginActive }">
          <!-- 登录 -->
          <div class="UserName">
            <label for="RegiName">用户名</label>
            <input type="text" name="username" id="RegiName" placeholder="请输入邮箱/手机号/用户名" v-model="register.UserName" />
          </div>
          <!-- 密码 -->
          <div class="UserPwd">
            <label for="LoginPassword1">密码</label>
            <input type="password" name="password1" id="LoginPassword1" placeholder="请输入8-16位密码" v-model="register.UserPwd1" />
          </div>
          <!-- 确认密码 -->
          <div class="UserPwd2">
            <label for="LoginPassword2">确认密码</label>
            <input type="password" name="password2" id="LoginPassword2" placeholder="请再次输入密码" v-model="register.UserPwd2" />
          </div>
          <!-- 验证码 -->
          <div class="VerificationCode">
            <label for="Verification_Code">验证码</label>
            <input type="text" name="password" id="Verification_Code" placeholder="请输入验证码" v-model="register.Code" />
            <button>获取验证码</button>
          </div>
          <button type="submit" id="LoginBtn" @click="LoginFun.UserRegister()">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { CloseBold, Hide, View } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import login from "@/store/APIFile/1Login";
import { ElMessage } from "element-plus";
const out: HTMLDivElement = ref(null);
const router = useRouter();
const store = useStore();
const goBack = () => {
  router.push("/");
};

var register: object = reactive({
  UserName: "bunny",
  UserPwd1: "123456abc",
  UserPwd2: "123456abc",
  Code: "",
});

var Login: object = reactive({
  UserName: "bunny",
  UserPwd: "123456abc",
});

const LoginData = reactive({
  LoginActive: true,
  LoginUserNameInput: "",
  LoginUserPwdIsShow: true,
  LoginName: "",
  LoginNameInfo: false,
  LoginNameDisable: false,
  LoginPwd: "",
  LoginPwdInfo: false,
  LoginPwdDisable: false,
  LoginDisable: true,
});

const LoginFun = reactive({
  //修改登录页面显示
  ChangeLogin(flag: boolean) {
    LoginData.LoginActive = flag;
  },
  //  清除用户名输入框内容
  ClearInput() {
    LoginData.LoginUserNameInput = "";
  },
  //  验证密码输入是否正确
  InputPwdIsTrue() {
    if (Login.UserPwd.length >= 8 && Login.UserPwd.length <= 16) {
      LoginData.LoginPwdInfo = false;
      LoginData.LoginPwdDisable = true;
    } else {
      LoginData.LoginPwdDisable = false;
      LoginData.LoginPwdInfo = true;
    }
  },
  //  判断用户名输入是否正确
  InputUserNameIsTrue() {
    if (Login.UserName.length >= 4 && Login.UserName.length <= 32) {
      LoginData.LoginNameDisable = true;
      LoginData.LoginNameInfo = false;
    } else {
      LoginData.LoginNameDisable = false;
      LoginData.LoginNameInfo = true;
    }
  },
  //  TODO 用户注册
  async UserRegister() {
    var { UserName, UserPwd1, UserPwd2 } = register;
    let data: object = {
      UserName,
      UserPwd1,
    };
    if (UserName && UserPwd1 && UserPwd2) {
      try {
        let result = await store.dispatch("PostRegister", data);
        ElMessage({
          showClose: true,
          message: `注册成功 ${result.code}`,
          type: "success",
          center: true,
        });
        LoginData.LoginActive = true;
      } catch (e) {
        ElMessage({
          showClose: true,
          message: `注册失败 ${e.message}`,
          type: "error",
          center: true,
        });
      }
    }
  },
  //  TOOD 用户登录
  async UserLogin() {
    ElMessage.closeAll();
    try {
      let result = await store.dispatch("PostLogin", Login);
      ElMessage({
        showClose: true,
        message: `登录成功 ${result.code}`,
        type: "success",
        center: true,
      });
      localStorage.setItem("USERINFO", JSON.stringify(result.data[0]));
      router.push("/");
    } catch (e) {
      ElMessage({
        showClose: true,
        message: `登录失败-${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
});

onMounted(() => {
  watch(
    () => document.body.offsetHeight,
    () => {
      out.value.style.height = document.documentElement.clientHeight + "px";
    },
    { deep: true, immediate: true },
  );
  //  监视两个（用户名和密码）值是否都为真
  watch(
    [() => LoginData.LoginNameDisable, () => LoginData.LoginPwdDisable],
    () => {
      if (LoginData.LoginNameDisable && LoginData.LoginPwdDisable) LoginData.LoginDisable = false;
    },
    { deep: true },
  );
});
</script>

<style scoped lang="less">
@primary: #409eff;
@primary_hover: #a0cfffff;
@primary_bgc: #d9ecffff;
//错误
@danger: #f56c6cff;
@danger_hover: #fab6b6ff;
@danger_bgc: #fde2e2ff;
//选择
@active: #ecf5ff5c;
// 背景或文字 _bgc
@info: #909399ff; //登录状态选项
.LoginShowActive {
  animation: LoginAn 1s ease-in-out forwards;
}
input {
  position: relative;
  width: 400px;
  height: 40px;
  outline: none;
  color: #fff;
  font-size: 13px;
  text-indent: 10px;
  text-align: left;
  border-radius: 10px;
  border: @primary 1px solid;
  background-color: transparent;
  transition: all 0.5s;
  box-sizing: border-box;

  &:focus {
    border: 1px solid #fff;
  }

  // 为 placeholder 设置样式
  &[type="text"]::placeholder,
  &[type="password"]::placeholder {
    color: #fafafa;
    // text-align: left;
  }
}
@keyframes LoginAn {
  0% {
    opacity: 1;
    transform-origin: 50% 50% 0;
  }

  100% {
    transform-origin: 0 0;
    transform: scale(0.000001);
    opacity: 0;
  }
}
.el-icon {
  position: absolute;
  top: 18px;
  right: 125px;
  cursor: pointer;
}
// 函数
.login_register() {
  label {
    display: inline-block;
    width: 70px;
    height: 40px;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }

  .UserName {
    position: relative;
    .them();
    margin-top: 50px;
    span {
      position: absolute;
      top: 30px;
      left: 195px;
      color: @danger;
      overflow: hidden;
    }
  }

  .UserPwd {
    .them();
    margin-top: 150px;
    span {
      position: absolute;
      top: 30px;
      left: 195px;
      color: @danger;
      overflow: hidden;
    }
  }
}

.them() {
  float: left;
  position: absolute;
  left: 50%;
  transform: translateX(-55%);
  width: 700px;
  height: 50px;
  line-height: 50px;
}

body,
html,
#app {
  width: 100%;
  height: 100%;
}

.top-active {
  color: @primary_hover;
  background-color: #9093997c;
}

// 外部
.out {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 930px;
  background: url(./images/bg.png) no-repeat center;
  background-size: cover;

  // 内部登录
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 550px;
    border-radius: 50px;
    overflow: hidden;
    background-image: url(./images/login.webp);

    // 上面
    .top {
      width: 100%;
      height: 88px;
      float: left;
      color: @primary;
      font-size: 22px;
      text-align: center;
      line-height: 88px;
      cursor: pointer;
      background-color: #ecf5ff34;

      // 左边的
      .top-left {
        float: left;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        border-right: 2px solid @info;

        &:hover {
          color: @primary;
          background-color: #ecf5ff5c;
        }
      }

      // 右边的
      .top-right {
        float: left;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        border-left: 2px solid @info;

        &:hover {
          color: @primary;
          background-color: #ecf5ff5c;
        }
      }
    }

    .bottom {
      position: relative;
      float: left;
      width: 100%;
      height: 462px;
      background-color: #d9ecff4f;

      // 登录内容
      .login_content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 615px;
        height: 360px;
        text-align: center;
        background-color: #ecf5ff22;
        .login_register();

        // 按钮
        #LoginBtn {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 250px;
          width: 300px;
          height: 50px;
          border: none;
          border-radius: 10px;
          color: #fff;

          &:hover {
            background-color: @primary_hover;
          }
        }
      }

      .register_content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 615px;
        height: 360px;
        text-align: center;
        background-color: #ecf5ff22;
        .login_register();

        .UserPwd {
          .them();
          margin-top: 100px !important;
        }

        .UserPwd2 {
          .them();
          margin-top: 150px;
        }

        .VerificationCode {
          .them();
          margin-top: 200px;

          #Verification_Code {
            width: 290px;
          }

          button {
            margin-left: 10px;
            width: 100px;
            box-sizing: border-box;
            border: none;
            border-radius: 10px;
            height: 40px;
            background-color: @primary;
            color: #fff;
            cursor: pointer;

            &:hover {
              background-color: @primary_hover;
            }
          }
        }

        // 按钮
        #LoginBtn {
          float: left;
          position: absolute;
          left: 50%;
          bottom: 40px;
          transform: translateX(-50%);
          margin-top: 250px;
          width: 300px;
          height: 50px;
          border: none;
          border-radius: 10px;
          color: #fff;
          background-color: @primary;
          font-size: 16px;
          cursor: pointer;

          &:hover {
            background-color: @primary_hover;
          }
        }
      }
    }
  }
}
</style>
