<template>
  <!-- 权威认证 -->
  <div class="qwrz">
    <div class="w">
      <!-- 上面 -->
      <div class="qwrzTitle">
        <h1>权威认证</h1>
        <p>多方权威认证，为您提供安全可靠服务</p>
      </div>
      <div class="qwrzCount">
        <ul>
          <li v-for="(qwrzItem, qwrzIndex) in qwrz.qwrzCount" :key="qwrzIndex">
            <img :src="qwrzItem.imgUrl" alt="" />
            <p>{{ qwrzItem.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
const qwrz = reactive({
  qwrzCount: computed(() => store.state.HomeMainPage.qwrzCount),
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
.qwrz {
  height: 350px;
  .w {
    // 标题
    .qwrzTitle {
      padding-top: 60px;
      h1 {
        height: 40px;
        margin-bottom: 20px;
        font-size: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
    // 内容
    .qwrzCount {
      ul {
        li {
          float: left;
          width: 200px;
          height: 136px;
          text-align: center;
          box-sizing: border-box;
          transition: all 0.6s;
          &:hover {
            box-shadow: 0 0 30px 0 #ddd;
            transform: translateY(-2px);
          }
          img {
            width: 128px;
            height: 128px;
          }
          p {
            margin-top: 17px;
            color: #333;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
