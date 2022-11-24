<template>
  <nav>
    <ul>
      <li v-for="(Nav, Navindex) in NavData.HomeNav" :key="Navindex">
        <a href="JavaScript:;">{{ Nav }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();

const NavData = reactive({
  HomeNav: computed(() => store.state.HomeMainPage.HomeNav),
});
</script>

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
// 导航栏
nav {
  float: left;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      float: left;
      list-style: none;
      margin: 0 10px;
      padding: 0 10px;

      a {
        display: inline-block;
        line-height: 64px;
        font-size: 14px;
      }
    }
  }
}
</style>
