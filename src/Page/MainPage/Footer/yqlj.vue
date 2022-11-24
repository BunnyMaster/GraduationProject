<template>
  <div class="yqlj">
    <ul>
      <li v-for="(yqlj, yqljIndex) in Data.yqljList" :key="yqljIndex">
        <a :href="yqlj.url" target="_blank">{{ yqlj.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, nextTick, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";

const store = useStore();
const Data = reactive({
  yqljList: computed(() => store.state.HomeMainPage.yqljList),
});

const Fun = reactive({
  async GetyqljList() {
    try {
      await store.dispatch("GetHomeNav");
    } catch (e: Error) {
      ElMessage({
        showClose: true,
        message: `${e.message}`,
        type: "error",
        center: true,
      });
    }
  },
});

onMounted(() => {
  Fun.GetyqljList();
});
</script>

<style scoped lang="less">
.w {
  width: 1200px;
  margin: 0 auto;
  .yqlj {
    float: left;
    width: 100%;
    height: 57px;
    margin-top: 30px;
    border-top: 2px solid #333;
    ul {
      margin-top: 30px;
      li {
        float: left;
        height: 20px;
        padding-right: 20px;
        line-height: 20px;
        a {
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
