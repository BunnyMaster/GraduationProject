<template>
  <!-- 行业解决方案 -->
  <div class="hyal">
    <div class="w">
      <!-- 上面 -->
      <div class="hyalTitle">
        <h1>行业方案 <a href="#">查看更多</a></h1>
        <p>柯力云鲸挖掘行业痛点，为企业提供全场景行业解决方案服务</p>
      </div>
      <HyalTop :hyal-list="Data.hyalList" :hyal-show-index="Data.hyalShowIndex" @ChangehyalShowIndex="Fun.ChangehyalShowIndex" />
      <HyalBottom :hyal-list="Data.hyalList" :hyal-show-index="Data.hyalShowIndex" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import HyalBottom from "@/Page/MainPage/hyal/hyalBottom.vue";
import HyalTop from "@/Page/MainPage/hyal/hyalTop.vue";
const store = useStore();
const Data = reactive({
  hyalShowIndex: 0,
  hyalList: computed(() => store.state.HomeMainPage.hyalList),
});
const Fun = reactive({
  // 发请求
  async Gethyal() {
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
  //  改变 hyalShowIndex
  ChangehyalShowIndex(index: number) {
    Data.hyalShowIndex = index;
  },
});

onMounted(() => {
  Fun.Gethyal();
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

// 行业解决方案
.hyal {
  height: 560px;
  background-color: #f4f3fb;
  box-sizing: border-box;
  .w {
    width: 1200px;
    margin: 0 auto;
    .hyalTitle {
      padding-top: 65px;
      margin-bottom: 30px;
      h1 {
        height: 40px;
        margin-bottom: 20px;
        font-size: 40px;
        line-height: 40px;
        text-align: center;
        a {
          float: right;
          color: #409eff;
          font-size: 20px;
          &:hover {
            color: #40aef1;
          }
        }
      }
    }
  }
}
</style>
