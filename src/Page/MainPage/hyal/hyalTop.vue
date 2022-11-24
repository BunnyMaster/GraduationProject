<template>
  <div class="hyal_top">
    <ul>
      <li
        :class="{ hyalshowActive: hyalIndex === hyalShowIndex }"
        v-for="(hyal, hyalIndex) in hyalList"
        :key="hyalIndex"
        @mouseenter="Fun.ChangehyalShowIndex(hyalIndex)"
        @mouseleave="Fun.TurnOnTimer"
      >
        {{ hyal.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits, nextTick, onMounted } from "vue";
import { throttle, debounce } from "lodash";
var prop = defineProps(["hyalShowIndex", "hyalList"]);
const emit = defineEmits(["ChangehyalShowIndex"]);
var num = 0;
var timer: any = null;
const Fun = reactive({
  //  改变 hyalShowIndex
  ChangehyalShowIndex: debounce(
    (index: number) => {
      clearInterval(timer);
      timer = null;
      emit("ChangehyalShowIndex", index);
      num = index;
    },
    300,
    {
      leading: false,
      trailing: true,
    },
  ),
  TurnOnTimer: throttle(() => {
    clearInterval(timer);
    timer = null;
    timer = setInterval(() => {
      num++;
      console.log(num);
      if (num >= prop.hyalList.length - 1) num = 0;
      emit("ChangehyalShowIndex", num);
    }, 2000);
  }, 1000),
});

onMounted(() => {
  nextTick(
    throttle(() => {
      timer = setInterval(() => {
        num++;
        if (num >= prop.hyalList.length - 1) num = 0;
        emit("ChangehyalShowIndex", num);
      }, 2000);
    }, 1000),
  );
});
</script>

<style scoped lang="less">
.hyalshowActive {
  color: #409eff;
  border-bottom: 3px solid #409eff;
}
@keyframes hyalAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.hyal_top {
  float: left;
  margin-bottom: 5px;
  box-sizing: border-box;
  ul {
    float: left;
    text-align: center;
    border-bottom: 1px solid #ddd;
    transition: all 0.5s;
    box-sizing: border-box;

    li {
      float: left;
      width: 120px;
      height: 52px;
      color: #333;
      font-size: 18px;
      line-height: 52px;
      cursor: pointer;
      transition: all 0.2s;
      box-sizing: border-box;
      animation: both hyalAnimation 0.5s;
      &:hover {
        color: #409eff;
        border-bottom: 3px solid #409eff;
      }
    }
  }
}
</style>
