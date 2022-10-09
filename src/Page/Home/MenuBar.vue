<template>
  <div class="MenuBox">
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      :collapse="MenuBarData.isCollapse"
      @open="MenuBarFun.handleOpen"
      @close="MenuBarFun.handleClose"
      :unique-opened="true"
      :ellipsis="true"
    >
      <template
        v-for="(MenuItem, MenuIndex) in MenuBarData.MenuBarList"
        :key="MenuIndex"
      >
        <el-sub-menu
          v-if="MenuItem.Menu || MenuItem.MenuList"
          :index="MenuIndex.toString()"
        >
          <template #title>
            <el-icon>
              <component :is="MenuItem.Icon" />
            </el-icon>
            <span> {{ MenuItem.title }}</span>
          </template>
          <el-menu-item
            v-for="(MenuChildren, MenuChildrenIndex) in MenuItem.Menu"
            :key="MenuChildrenIndex"
            :index="`${MenuIndex.toString()}-${MenuChildrenIndex.toString()}`"
          >
            <router-link
              :to="MenuChildren.Link"
              style="text-decoration: none; width: 100%"
            >
              {{ MenuChildren.Name }}
            </router-link>
          </el-menu-item>
          <!--       判断是否有隐藏的-->
          <div v-if="MenuItem.MenuList">
            <el-sub-menu
              v-for="(MenuChildren, MenuChildrenIndex) in MenuItem.MenuList"
              :key="MenuChildren.MenuId"
              :index="`${MenuIndex.toString()}-${MenuChildrenIndex.toString()}`"
            >
              <template #title>
                <span>{{ MenuChildren.MenuTitle }}</span>
              </template>
              <el-menu-item
                v-for="(
                  MenuListChildren, MenuListChildrenIndex
                ) in MenuChildren.MenuChild"
                :index="`${MenuIndex.toString()}-${MenuChildrenIndex.toString()}-${MenuListChildrenIndex.toString()}`"
              >
                <router-link
                  :to="MenuListChildren.Link"
                  style="text-decoration: none; width: 100%"
                >
                  {{ MenuListChildren.Name }}
                </router-link>
              </el-menu-item>
            </el-sub-menu>
          </div>
        </el-sub-menu>
        <el-menu-item v-else :index="MenuIndex.toString()">
          <el-icon>
            <component :is="MenuItem.Icon" />
          </el-icon>
          <template #title>{{ MenuItem.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { Iphone, House, Files, Management } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const store = useStore();

const MenuBarData = reactive({
  isCollapse: computed(() => store.state.MenuBar.isCollapse),
  activeName: 1,
  MenuBarList: computed(() => store.state.MenuBar.MenuBarList) || [{}],
});
const MenuBarFun = reactive({
  // 菜单栏打开时
  handleOpen(key: string, keyPath: string[]) {},
  //菜单栏关闭时
  handleClose(key: string, keyPath: string[]) {},
  //  获取菜单栏数据
  GetMenuBarList() {
    store.dispatch("GetMenuBarList");
  },
});

onMounted(async () => {
  try {
    await MenuBarFun.GetMenuBarList();
  } catch (e) {
    ElMessage.closeAll();
    ElMessage({
      showClose: true,
      message: "Oops, this is a error message.",
      type: "error",
      center: true,
    });
  }
});
</script>

<style lang="less">
a:hover {
  color: #409eff;
}
.el-menu-item:hover {
  color: #409eff;
}
.demo-collapse {
  .el-icon {
    float: left;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}

.el-menu {
  height: 100%;
}

.el-main {
  background-color: gainsboro;
}

.el-aside,
.el-container,
.common-layout,
#app,
body,
html {
  height: 100%;
  box-sizing: border-box;
}

.MenuBox {
  float: left;
  height: 100%;
  box-sizing: border-box;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
}
</style>
