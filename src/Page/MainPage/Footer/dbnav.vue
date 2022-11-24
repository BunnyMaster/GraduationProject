<template>
  <nav class="dbnav">
    <div class="flogo">
      <div class="dblogo">
        <img src="https://www.kelicloud.cn/skin/images/logodi.png" alt="" />
      </div>
      <ul>
        <li class="ico1">400-9980-863</li>
        <li class="ico2">微信:18588785629</li>
        <li class="ico3">liucf@kelicloud.cn</li>
      </ul>
    </div>
    <!-- 产品服务 -->
    <dl class="wtb" v-if="Data.cpalList">
      <dd>{{ Data.cpalList.title }}</dd>
      <dt v-for="(cpal, cpalIndex) in Data.cpalList.countent" :key="cpalIndex">
        <a :href="cpal.url">{{ cpal.text }}</a>
      </dt>
    </dl>
    <!-- 行业方案 -->
    <dl class="wtb" v-if="Data.hyalList">
      <dd>{{ Data.hyalList.title }}</dd>
      <dt v-for="(hyal, hyalIndex) in Data.hyalList.countent" :key="hyalIndex">
        <a :href="hyal.url">{{ hyal.text }}</a>
      </dt>
    </dl>
    <!-- 数字化学院 -->
    <dl v-if="Data.szxyList">
      <dd>{{ Data.szxyList.title }}</dd>
      <dt v-for="(szxy, szxyIndex) in Data.szxyList.countent" :key="szxyIndex">
        <a :href="szxy.url">{{ szxy.text }}</a>
      </dt>
    </dl>
    <!-- 关于柯力云鲸 -->
    <dl v-if="Data.companyList">
      <dd>{{ Data.companyList.title }}</dd>
      <dt v-for="(company, companyIndex) in Data.companyList.countent" :key="companyIndex">
        <a :href="company.url">{{ company.text }}</a>
      </dt>
    </dl>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";

const store = useStore();

const Data = reactive({
  // wtbList: computed(() => store.state.HomeMainPage.wtbList),
  cpalList: computed(() => store.state.HomeMainPage.wtbList.cpal),
  hyalList: computed(() => store.state.HomeMainPage.wtbList.hyal),
  szxyList: computed(() => store.state.HomeMainPage.wtbList.szxy),
  companyList: computed(() => store.state.HomeMainPage.wtbList.company),
});

const Fun = reactive({
  async GetwtbList() {
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
  Fun.GetwtbList();
});
</script>

<style scoped lang="less">
.w {
  width: 1200px;
  margin: 0 auto;
  .dbnav {
    // logo 图片
    .flogo {
      float: left;
      width: 242px;
      height: 198px;
      padding-right: 40px;
      border-right: 2px solid #333;
      box-sizing: border-box;
      .dblogo {
        padding-bottom: 10px;
        border-bottom: 2px solid #333;
        img {
          width: 145px;
          height: 47px;
        }
      }
      ul {
        padding-top: 10px;
        li {
          width: 200px;
          height: 40px;
          color: #fff;
          font-size: 14px;
          line-height: 40px;
          opacity: 0.4;
        }
      }
    }
    dl:last-child {
      width: 170px;
      box-sizing: border-box;
      dd {
        width: 130px;
      }
    }
    dl {
      float: left;
      width: 172px;
      height: 188px;
      padding-left: 20px;
      border-right: 2px solid #333;
      box-sizing: border-box;
      dd {
        display: block;
        height: 24px;
        margin-bottom: 20px;
        color: #fff;
        line-height: 24px;
        font-size: 18px;
      }
      dt {
        height: 24px;
        font-size: 12px;
        line-height: 24px;
        a {
          height: 16px;
        }
      }
    }
    .wtb {
      width: 307px;
      height: 188px;
      dd {
        width: 265px;
      }
      dt {
        float: left;
        width: 50%;
      }
    }
  }
}
</style>
