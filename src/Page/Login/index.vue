<template>
  <div class="out" ref="out">
    <!-- 登录 -->
    <div class="login_box">
      <div class="top">
        <!-- 左边的 -->
        <div class="top-left top-active">登录</div>
        <!-- </div>右边的 -->
        <div class="top-right">注册</div>
      </div>
      <div class="bottom">
        <!-- 登录内容 -->
        <div class="login_content">
          <!-- 登录 -->
          <div class="UserName"><label for="LoginName">用户名</label> <input type="text" name="username" id="LoginName" placeholder="请输入邮箱/手机号/用户名" /></div>
          <!-- 密码 -->
          <div class="UserPwd"><label for="LoginPassword">密码</label> <input type="password" name="password" id="LoginPassword" placeholder="请输入8-16位密码" /></div>
          <button type="submit" id="LoginBtn">登录</button>
        </div>
        <!-- 注册内容 -->
        <div class="register_content">
          <!-- 登录 -->
          <div class="UserName">
            <label for="RegiName">用户名</label>
            <input type="text" name="username" id="RegiName" placeholder="请输入邮箱/手机号/用户名" />
          </div>
          <!-- 密码 -->
          <div class="UserPwd">
            <label for="LoginPassword1">密码</label>
            <input type="password" name="password1" id="LoginPassword1" placeholder="请输入8-16位密码" />
          </div>
          <!-- 确认密码 -->
          <div class="UserPwd2">
            <label for="LoginPassword2">确认密码</label>
            <input type="password" name="password2" id="LoginPassword2" placeholder="请再次输入密码" />
          </div>
          <!-- 验证码 -->
          <div class="VerificationCode">
            <label for="Verification_Code">验证码</label>
            <input type="text" name="password" id="Verification_Code" placeholder="请输入验证码" />
            <button>获取验证码</button>
          </div>
          <button type="submit" id="LoginBtn">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
const out: HTMLDivElement = ref(null);
onMounted(() => {
  watch(
    () => document.body.offsetHeight,
    () => {
      out.value.style.height = document.documentElement.clientHeight + "px";
    },
    { deep: true, immediate: true },
  );
});
</script>

<style scoped lang="less">
@login_top_hover_bgc: #debcff;
@login_box_top: #b791dd3b;
@login_box_top_font_color: #fff;
@login_box_top_font_bgc_color: #ffffff56;
@login_box_top_bgc_color: #ffffff7e;
@LoginOrRegister_bgc: #ffffff3d; //登录或者注册背景颜色---半透明
@login_content_display: none;
@register_content_display: block;
@8a2be2: #8a2be2; //原本的颜色
@8400ff: #8400ff; //触碰后的颜色

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

  input {
    width: 400px;
    height: 40px;
    outline: none;
    color: #fff;
    font-size: 13px;
    text-indent: 10px;
    text-align: left;
    border-radius: 10px;
    border: blue 1px solid;
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

  .UserName {
    .them();
    margin-top: 50px;
  }

  .UserPwd {
    .them();
    margin-top: 150px;
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
  color: @login_top_hover_bgc;
  background-color: @login_box_top_font_bgc_color;
}

// 外部
.out {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 900px;
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
      color: @login_box_top_font_color;
      font-size: 22px;
      text-align: center;
      line-height: 88px;
      cursor: pointer;
      background-color: @login_box_top;

      // 左边的
      .top-left {
        float: left;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        border-right: 2px solid #a0a0a0;

        &:hover {
          color: @login_top_hover_bgc;
          background-color: @login_box_top_bgc_color;
        }
      }

      // 右边的
      .top-right {
        float: left;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        border-left: 2px solid #a0a0a0;

        &:hover {
          color: @login_top_hover_bgc;
          background-color: @login_box_top_bgc_color;
        }
      }
    }

    .bottom {
      position: relative;
      float: left;
      width: 100%;
      height: 462px;
      background-color: @LoginOrRegister_bgc;

      // 登录内容
      .login_content {
        display: @login_content_display;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 615px;
        height: 360px;
        text-align: center;
        animation: LoginAn 1s ease-in-out forwards;
        background-color: @LoginOrRegister_bgc;
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
          background-color: blueviolet;
          cursor: pointer;

          &:hover {
            background-color: #4b2370;
          }
        }
      }

      .register_content {
        display: @register_content_display;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 615px;
        height: 360px;
        text-align: center;
        background-color: @LoginOrRegister_bgc;
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
            background-color: @8a2be2;
            color: #fff;
            cursor: pointer;

            &:hover {
              background-color: @8400ff;
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
          background-color: @8a2be2;
          font-size: 16px;
          cursor: pointer;

          &:hover {
            background-color: @8400ff;
          }
        }
      }
    }
  }
}
</style>
