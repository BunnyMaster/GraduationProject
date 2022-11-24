<template>
  <div class="footer_top">
    <div class="w">
      <span>1v1按需求定制个性化方案，全程360°服务</span>
      <dl class="Fixclear">
        <dd>
          <el-icon size="20" style="margin-right: 5px"><PhoneFilled /></el-icon>400-9980-863
        </dd>
        <dd>
          <el-icon :size="20" style="margin-right: 5px"><Iphone /></el-icon>185-8878-5629
        </dd>
      </dl>
      <a href="https://p.qiao.baidu.com/cps/chat?siteId=17993467&userId=22437698&siteToken=c98463c513067795b2d80256d01c1946">立即咨询</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Iphone, PhoneFilled } from "@element-plus/icons-vue";
</script>

<style scoped lang="less">
.footer_top {
  height: 264px;
  text-align: center;
  background-image: url(https://www.kelicloud.cn/skin/images/db.jpg);
  .w {
    padding-top: 50px;
    span {
      width: 440px;
      color: #fff;
      font-size: 18px;
    }
    dl {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 440px;
      margin: 20px auto 35px auto;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      text-align: center;
      dd {
        color: #fff;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
    a {
      display: block;
      width: 170px;
      height: 50px;
      margin: 0 auto;
      line-height: 50px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      background: linear-gradient(to right, #40aef1, #409eff);
      &:hover {
        color: #fff;
        background: linear-gradient(to right, #60bdf7, #40aef1);
      }
    }
  }
}
</style>
