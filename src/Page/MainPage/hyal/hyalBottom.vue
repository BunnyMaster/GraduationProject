<template>
  <div class="hyal_bottom">
    <ul>
      <li v-for="(hyal, hyalIndex) in hyalList" :key="hyalIndex" v-show="hyalShowIndex === hyalIndex">
        <dd><img :src="hyal.imgUrl" alt="" /></dd>
        <dt>
          <p>{{ hyal.detail }}</p>
          <div>
            <a class="solution" target="_blank" :href="hyal.Nowsolution">获取解决方案</a>
            <a target="_blank" :href="hyal.Learnsolution">了解方案详情</a>
          </div>
        </dt>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

var prop = defineProps(["hyalList", "hyalShowIndex"]);
</script>

<style scoped lang="less">
@keyframes hyalAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.hyal_bottom {
  float: left;
  height: 309px;
  margin-top: 15px;
  overflow: hidden;
  ul {
    li {
      height: 309px;
      animation: both hyalAnimation 0.3s;
      dd {
        float: left;
        width: 450px;
        height: 309px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dt {
        float: left;
        width: 720px;
        height: 263px;
        margin-left: 30px;
        p {
          margin: 20px 0 70px;
          font-size: 16px;
          text-align: left;
          line-height: 2;
        }
        div {
          float: right;
          a {
            float: left;
            width: 132px;
            height: 45px;
            margin-left: 20px;
            color: #409eff;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            border: 1px solid #409eff;
            //box-sizing: border-box;
            &:hover {
              color: #54b8f7;
            }
          }
          .solution {
            color: #fff;
            background: linear-gradient(to right, #40aef1, #409eff);
            &:hover {
              color: #fff;
              background: linear-gradient(to right, #54b8f7, #58a8f8);
            }
          }
        }
      }
    }
  }
}
</style>
