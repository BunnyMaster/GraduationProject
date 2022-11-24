<template>
  <Header />
  <Pull />
  <SildShow />
  <Zcgh />
  <Hyal />
  <Qwrz />
  <Footer />
</template>

<script setup lang="ts">
import Header from "./Header/index.vue";
import Pull from "./Pull/index.vue";
import SildShow from "./SlidShow/index.vue";
import Zcgh from "./zcgh/index.vue";
import Hyal from "./hyal/index.vue";
import Qwrz from "./qwrz.vue";
import Footer from "./Footer/index.vue";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
const store = useStore();
const NavFun = reactive({
  async GETHomeMainPage() {
    try {
      await store.dispatch("GetHomeNav");
    } catch (e) {
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
  NavFun.GETHomeMainPage();
});
</script>
