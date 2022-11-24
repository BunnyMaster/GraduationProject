<template>
  <header>
    <!-- 头部 -->
    <div class="w">
      <div class="logo">
        <router-link to="MainPage"><img src="@/assets/images/logo.png" alt="logo" /></router-link>
      </div>
      <!--   导航栏   -->
      <Nav />
      <!--   导航栏右侧   -->
      <NavRight />
    </div>
  </header>
</template>
<script setup lang="ts">
import Nav from "./nav.vue";
import NavRight from "./NavRight.vue";
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
p {
  color: #666;
  font-size: 14px;
  text-align: center;
}
// 头部
header {
  float: left;
  width: 100%;
  min-width: 1200px;
  height: 64px;
  background-color: #fff;

  // logo
  .logo {
    position: relative;
    float: left;
    width: 130px;
    height: 64px;
    margin-right: 14px;
    overflow: hidden;

    a {
      position: absolute;
      float: left;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 45px;

      &:hover {
        color: #fff !important;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
