<template>
  <!-- 底部 -->
  <footer>
    <!--  顶部  -->
    <FooterTop />
    <!--  底部 -->
    <FooterBottom />
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.w {
  width: 1200px;
  margin: 0 auto;
}
p {
  color: #666;
  font-size: 14px;
  text-align: center;
}
</style>
<script>
import Dbnav from "@/Page/MainPage/Footer/dbnav";
import FooterTop from "@/Page/MainPage/Footer/FooterTop";
import Yqlj from "@/Page/MainPage/Footer/yqlj";
import Copyright from "@/Page/MainPage/Footer/copyright";
import FooterBottom from "@/Page/MainPage/Footer/FooterBottom";
export default {
  components: { FooterBottom, Copyright, Yqlj, FooterTop, Dbnav },
};
</script>
