<template>
  <el-container class="ShowCountent">
    <Dialog_AddItem :tableList="tableList" :DialogTitle="Data.HomeHeaderTitle" :dialogFormVisible="Data.dialogFormVisible" @AddItem="Fun.AddItem" />
    <!--          TODO 主体页面展示-->
    <el-header class="HomeHeader">
      <HomeHeader>
        <template #HomeHeader>
          <!--          图标-->
          <el-icon style="float: left; margin-top: 12.5px" :size="22"> <component :is="Data.HomeHeaderIcon" /> </el-icon>
          <span class="HomeHeaderGroup">组别:{{ Data.HomeHeaderTitle }}</span>
          <!--          TODO 搜索部分-->
          <div class="Search_Add" v-if="Data.Seach_ADDisShow">
            <slot name="Search_Add" />
            <el-button class="My-Search-Btn" type="success" plain :icon="Bottom" @click="Fun.ExportXlsx()">导出</el-button>
          </div>
          <!--            TODO -->
          <el-tooltip class="box-item" effect="dark" :content="Data.FullScreenFlag ? '全屏显示' : '退出全屏'" placement="bottom">
            <el-icon :class="Data.FullScreenFlag ? 'FullScreen-switch' : 'ExitFullScreen-switch'" :size="30" color="#409EFF" @click="Fun.FullScreen">
              <FullScreen />
            </el-icon>
          </el-tooltip>
        </template>
      </HomeHeader>
    </el-header>
    <!--  TODO stripe---带变框-->
    <slot name="default"></slot>

    <!--    TODO 分页器-->
    <div class="demo-pagination-block" v-if="Data.tableData && Data.FullScreenFlag">
      <el-pagination
        v-model:currentPage="Data.currentPage"
        v-model:page-size="Data.pageSize"
        :page-sizes="Data.PageTotalList"
        :small="Data.small"
        :disabled="Data.disabled"
        :background="Data.background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Data.AllPageSize"
        @size-change="Fun.handleSizeChange"
        @current-change="Fun.handleCurrentChange"
      />
    </div>
  </el-container>
</template>

<script lang="ts" setup>
import HomeHeader from "@/components/HomeHeader.vue";
import * as XLSX from "xlsx";
import { ElMessage, ElNotification } from "element-plus";
import { Search, Plus, Bottom, FullScreen } from "@element-plus/icons-vue";
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Dialog_AddItem from "@/components/Dialog_AddItem.vue";
import AndroidPAD from "@/store/APIFile/AndroidPAD";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}

const route = useRoute();
const store = useStore();
const props = defineProps(["tableData", "Seach_ADDisShow", "tableList"]);
const emit = defineEmits(["ChangepageSize", "ChangeCurrentChange"]);
const Data = reactive({
  MenuBarList: computed(() => store.state.MenuBar.MenuBarList),
  HomeHeaderIcon: "ChromeFilled",
  HomeHeaderTitle: "",
  PageTotalList: [100, 200, 300, 400],
  currentPage: 0, // 前往多少页
  pageSize: 10, // 每页显示多少跳
  small: false,
  background: false,
  disabled: false,
  input: "",
  dialogFormVisible: false,
  FullScreenFlag: true,
  tableData: computed(() => props.tableData) || [],
  Seach_ADDisShow: props.Seach_ADDisShow,
  AllPageSize: computed(() => store.state.AndroidPAD.CountPage),
});
const Fun = reactive({
  //  TODO 找到当前标题表示的ICON
  FindThisIcon() {
    let RouterPath: string = route.path;
    for (let menuBarListKey in Data.MenuBarList) {
      //如果存在Menu
      if (Data.MenuBarList[menuBarListKey].Menu) {
        Data.MenuBarList[menuBarListKey].Menu.forEach((item: object, index: number) => {
          if (item.Link === RouterPath) {
            Data.HomeHeaderIcon = Data.MenuBarList[menuBarListKey].Icon;
            Data.HomeHeaderTitle = Data.MenuBarList[menuBarListKey].title;
          }
        });
      }
      //  不存在Menu
      else if (Data.MenuBarList[menuBarListKey].MenuList) {
        Data.MenuBarList[menuBarListKey].MenuList.forEach((item: object, index: number) => {
          //找到所属子列表
          Data.MenuBarList[menuBarListKey].MenuList.forEach((MenuListItem: any, MenuListIndex: number) => {
            //遍历子列表
            MenuListItem.MenuChild.forEach((MenuChildItem: any) => {
              if (MenuChildItem.Link === RouterPath) {
                Data.HomeHeaderIcon = Data.MenuBarList[menuBarListKey].Icon;
                // 找到标题名
                Data.HomeHeaderTitle = `${Data.MenuBarList[menuBarListKey].title}->${MenuChildItem.Name}`;
              }
            });
          });
        });
      } else {
        ElMessage.closeAll();
        ElMessage({
          showClose: true,
          message: `FindThisIcon-出错了-Page-Home-Router`,
          type: "error",
          center: true,
        });
        console.log("出错了");
      }
    }
  },
  // TODO 分页器数组
  PageTotalList() {
    let TotalList: number[] = [];
    for (let i = 10; i <= 100; i += 10) TotalList.push(i);
    Data.PageTotalList = TotalList;
  },
  // TODO 分页器数据修改
  handleSizeChange(val: number) {
    Data.pageSize = val;
    emit("ChangeCurrentChange", Data.pageSize);
  },
  //  TODO 当分页器-page-点击时
  handleCurrentChange(val: number) {
    Data.currentPage = val;
    emit("ChangepageSize", Data.currentPage);
  },
  // TODO 导出数据表
  ExportXlsx() {
    const Table = document.querySelector(".el-table");
    let web = XLSX.utils.table_to_book(Table);
    if (route.meta.title) {
      XLSX.writeFile(web, `${route.meta.title}.xls`);
      ElNotification({
        title: "成功,正在下载",
        message: `${route.meta.title}数据表正在下载......`,
        type: "success",
        showClose: true,
        position: "top-left",
      });
    } else {
      XLSX.writeFile(web, "产品数据表.xls");
      ElNotification({
        title: "Warning",
        message: "产品数据表表正在下载......",
        type: "success",
        showClose: true,
        position: "top-left",
      });
    }
  },
  //  点击全屏
  async FullScreen() {
    if (Data.FullScreenFlag) {
      try {
        await document.querySelector(".ShowCountent")!.requestFullscreen();
        Data.FullScreenFlag = !Data.FullScreenFlag;
      } catch (e) {
        Data.FullScreenFlag = !Data.FullScreenFlag;
      }
    } else {
      try {
        await document.exitFullscreen();
        Data.FullScreenFlag = !Data.FullScreenFlag;
      } catch (e) {
        Data.FullScreenFlag = !Data.FullScreenFlag;
      }
    }
  },
});

onMounted(() => {
  nextTick(() => {
    Fun.FindThisIcon(); // 找到当前标题表示的ICON
    Fun.PageTotalList(); // 生成分页器组---列表
    if (Data.Seach_ADDisShow === undefined) {
      Data.Seach_ADDisShow = true;
    }
  });
});
</script>

<style lang="less">
@keyframes ElMainAnimation {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
//全屏开关
.FullScreen-switch {
  position: absolute;
  right: 50px;
  top: 10px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.5);
  }
}
.ExitFullScreen-switch {
  position: absolute;
  right: 50px;
  top: 10px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(0.5);
  }
}
.HomeHeaderGroup {
  float: left;
  margin-left: 10px;
  color: #409eff;
  font-size: 20px;
  font-family: "华文行楷";
  cursor: default;
}
.HomeHeader {
  position: relative;
  height: 50px !important;
  background-color: #ddd;
  line-height: 50px;
  padding-left: 30px;
  font-size: 16px;
}
.demo-pagination-block {
  margin-top: 10px;
}
.Search_Add {
  width: auto;
  margin-left: 270px;
  .el-input {
    float: left;
    width: 220px;
    height: 35px;
    margin-top: 7.5px;
    background-color: transparent;
    border: 1px solid #409eff;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .My-Search-Btn,
  el-button {
    float: left;
    width: 100px;
    height: 35px;
    margin-top: 7.5px;
  }
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.ShowCountent {
  background-color: #d9ecff2d;
  transition: all 1s;
  animation: ElMainAnimation 0.5s ease-in-out;
}
</style>
