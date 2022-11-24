<template>
  <!-- 轮播图 -->
  <div class="slidshow">
    <div class="swiper">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
      >
        <swiper-slide v-for="(SlideShowItem, SlideShowIndex) in Data.SlideShowList" :key="SlideShowIndex"><img :src="SlideShowItem.imgUrl" alt="SlideShowItem.id" /></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/less";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import HomeMainPage from "@/store/modules/HomeMainPage";
import { ElMessage } from "element-plus";
const modules = [Navigation, Pagination, Scrollbar, A11y];
const store = useStore();
const onSwiper = (swiper: [string, number, boolean]) => {};
const onSlideChange = () => {};

const Data = reactive({
  SlideShowList: computed(() => store.state.HomeMainPage.SlideShowList),
});
const Fun = reactive({
  async GetSlideShow() {
    try {
      await store.dispatch("GetSlideShow");
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
  Fun.GetSlideShow();
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
// 轮播图
.slidshow {
  position: relative;
  top: -144px;
  width: 100%;
  min-width: 1200px;
  min-height: 300px;
  height: 500px;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
