<template>
  <div class="w">
    <div class="logo">
      <a href=""><img src="./images/logo.png" alt="logo" /></a>
    </div>
    <div class="look">
      <!-- 时间 -->
      <div class="time">
        <h3>{{ HeaderData.NowTime }}</h3>
      </div>
      <!-- 标题 -->
      <h1>这是标题</h1>
      <!-- 导航栏 -->
      <nav>
        <ul>
          <li>
            <div class="box">
              <div class="font">
                <router-link to="/home">首页</router-link>
              </div>
              <div class="bottom">
                <router-link to="/home">去首页</router-link>
              </div>
            </div>
          </li>
          <li>
            <div class="box">
              <div class="font">
                <router-link to="/system">系统信息</router-link>
              </div>
              <div class="bottom">
                <router-link to="/system">看系统</router-link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <!-- 登录选项 -->
      <div class="userInfo">
        <!-- 头像 -->
        <div class="headImg">
          <img src="./images/header-default.jpg" alt="用户头像" />
        </div>
        <!-- 用户名 -->
        <div class="UserName">
          <h1>用户名用户名</h1>
        </div>
        <!-- 登录和退出登录 -->
        <div class="Login-Loginout">
          <a href="">点击退出</a>
          <a href="">重新注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as dayjs from "dayjs";
import { nextTick, onMounted, reactive } from "vue";

const HeaderData = reactive({
  NowTime: dayjs(new Date()).format("YYYY-MM-DD ddd HH:mm:ss"),
});
const HeaderFun = reactive({
  ChangeNowTime() {
    setInterval(() => (HeaderData.NowTime = dayjs(new Date()).format("YYYY-MM-DD ddd HH:mm:ss")), 1000);
  },
});
onMounted(() => {
  nextTick(() => HeaderFun.ChangeNowTime());
});
</script>

<style scoped lang="less">
@8a2be2: #8a2be2; //原本的颜色
@8400ff: #ae5cfc; //触碰后的颜色

.w {
  padding: 10px 0;
  background-color: #8a2be2;
  min-width: 1600px;
  width: 100%;

  // logo
  .logo {
    position: absolute;
    width: 160px;
    float: left;
    margin-top: 2.5px;
    margin-left: 30px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;

    a {
      display: inline-block;
      width: 150px;
      height: 45px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 看板
  .look {
    position: relative;
    width: 1200px;
    height: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    text-align: center;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 3px 4px 10px -3px #000;
    overflow: hidden;
    box-sizing: border-box;

    // 时间
    .time {
      float: left;
      width: 300px;
      text-align: center;

      h3 {
        line-height: 50px;
        font-size: 16px;
        vertical-align: bottom;
      }
    }

    //   看板文字
    h1 {
      width: 400px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 28px;
      vertical-align: bottom;
    }

    // 导航栏
    nav {
      width: 200px;
      float: left;
      text-align: center;
      flex-wrap: nowrap;

      ul {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;

        li {
          float: left;
          width: 80px;
          height: 50px;
          // margin-right: 20px;
          line-height: 50px;
          perspective: 500px;
          border-radius: 10px;
          overflow: hidden;
          color: #fff;

          .box {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            transform-style: preserve-3d;
            transition: all 0.5s;
            box-sizing: border-box;
            cursor: pointer;

            .font {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: @8400ff;
              z-index: 10;
              transform: translateZ(25px);
              box-sizing: border-box;

              a {
                float: left;
                width: 100%;
                height: 100%;
                color: #ffffff;
                text-decoration: none;
                &:hover {
                  color: #ffffff !important;
                  text-decoration: none !important;
                }
              }
            }

            .bottom {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 9;
              transform: translateY(25px) rotateX(-90deg);
              box-sizing: border-box;
              background-color: #a94eff;

              a {
                float: left;
                width: 100%;
                height: 100%;
                color: #ffffff;
                text-decoration: none;
                &:hover {
                  color: #ffffff !important;
                  text-decoration: none !important;
                }
              }
            }

            &:hover {
              transform: rotateX(90deg);
            }
          }
        }
      }
    }

    // 用户信息
    .userInfo {
      flex: 1;
      width: 300px;
      box-sizing: border-box;
      margin-left: 10px;

      // 头像
      .headImg {
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        overflow: hidden;
        margin-top: 5px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      // 用户名
      .UserName {
        float: left;
        margin-left: 3px;
        box-sizing: border-box;
        cursor: pointer;

        h1 {
          width: 80px;
          height: 50px;
          padding: 0 3px;
          line-height: 50px;
          margin-left: 10px;
          text-align: left;
          font-size: 12px;
          color: #a94eff;
          white-space: nowrap;
          text-overflow: ellipsis;
          box-sizing: border-box;
          overflow: hidden;
        }
      }

      // 登录和退出登录
      .Login-Loginout {
        float: left;
        height: 50px;
        margin-left: 5px;
        line-height: 50px;
        box-sizing: border-box;

        a {
          display: inline-block;
          text-decoration: none;

          &:hover {
            color: #a94eff;
          }

          &:first-child::after {
            content: "";
            border-right: 1px solid #ccc;
            padding-left: 3px;
          }
        }
      }
    }
  }
}
</style>
