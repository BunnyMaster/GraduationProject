<template>
  <div class="MenuBox">
    <el-menu
      :default-active="MenuBarData.activeName"
      class="el-menu-vertical-demo"
      :collapse="MenuBarData.isCollapse"
      @open="MenuBarFun.handleOpen"
      @close="MenuBarFun.handleClose"
      :unique-opened="true"
      :ellipsis="true"
    >
      <el-menu-item index="0" :class="{ current_MenuBar: MenuBarData.activeName === '0' }">
        <el-icon>
          <Iphone />
        </el-icon>
        <template #title>
          <router-link to="/home/main" style="text-decoration: none; width: 100%" @click="MenuBarFun.ChangeActiveName(0)"> 系统首页 </router-link>
        </template>
      </el-menu-item>

      <template v-for="(MenuItem, MenuIndex) in MenuBarData.MenuBarList" :key="MenuItem.id">
        <el-sub-menu v-if="MenuItem.Menu || MenuItem.MenuList" :index="(MenuIndex + 1).toString()">
          <template #title>
            <el-icon>
              <component :is="MenuItem.Icon" />
            </el-icon>
            <span @click="MenuBarFun.ChangeActiveName(MenuItem.id)">
              {{ MenuItem.title }}
            </span>
          </template>
          <el-menu-item
            v-for="(MenuChildren, MenuChildrenIndex) in MenuItem.Menu"
            :key="MenuChildrenIndex"
            :index="`${(MenuIndex + 1).toString()}-${MenuChildrenIndex.toString()}`"
            :class="{ current_MenuBar: MenuBarData.activeName === `${(MenuIndex + 1).toString()}-${MenuChildrenIndex.toString()}` }"
          >
            <router-link
              :to="MenuChildren.Link"
              style="text-decoration: none; width: 100%"
              @click="MenuBarFun.ChangeActiveName(`${MenuItem.id.toString()}-${MenuChildrenIndex.toString()}`)"
            >
              {{ MenuChildren.Name }}
            </router-link>
          </el-menu-item>
          <!--       判断是否有隐藏的-->
          <div v-if="MenuItem.MenuList">
            <el-sub-menu
              v-for="(MenuChildren, MenuChildrenIndex) in MenuItem.MenuList"
              :key="MenuChildren.MenuId"
              :index="`${MenuItem.id.toString()}-${MenuChildrenIndex.toString()}`"
            >
              <template #title>
                <span @click="MenuBarFun.ChangeActiveName(`${MenuItem.id.toString()}-${MenuChildrenIndex.toString()}`)">
                  {{ MenuChildren.MenuTitle }}
                </span>
              </template>
              <el-menu-item
                v-for="(MenuListChildren, MenuListChildrenIndex) in MenuChildren.MenuChild"
                :index="`${(MenuIndex + 1).toString()}-${MenuChildrenIndex.toString()}-${MenuListChildrenIndex.toString()}`"
                :class="{ current_MenuBar: MenuBarData.activeName === `${(MenuIndex + 1).toString()}-${MenuChildrenIndex.toString()}-${MenuListChildrenIndex.toString()}` }"
              >
                <router-link
                  :to="MenuListChildren.Link"
                  style="text-decoration: none; width: 100%"
                  @click="MenuBarFun.ChangeActiveName(`${(MenuIndex + 1).toString()}-${MenuChildrenIndex.toString()}-${MenuListChildrenIndex.toString()}`)"
                >
                  {{ MenuListChildren.Name }}
                </router-link>
              </el-menu-item>
            </el-sub-menu>
          </div>
        </el-sub-menu>
        <el-menu-item v-else :index="MenuItem.id">
          <el-icon>
            <component :is="MenuItem.Icon" />
          </el-icon>
          <template #title>
            <span @click="MenuBarFun.ChangeActiveName(MenuItem.id)">
              {{ MenuItem.title }}
            </span>
          </template>
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
  activeName: "0",
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
  //  修改ActiveName
  ChangeActiveName(value: [string, number]) {
    MenuBarData.activeName = value.toString();
  },
});
// TODO 获取菜单栏数据
onMounted(async () => {
  MenuBarFun.ChangeActiveName(MenuBarData.activeName);
  try {
    await MenuBarFun.GetMenuBarList();
  } catch (e: Error) {
    ElMessage.closeAll();
    ElMessage({
      showClose: true,
      message: `${e.message}`,
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
.is-dark {
  a {
    color: #ffffff;
    &:hover {
      color: #409eff;
    }
  }
}
.el-menu-item:hover {
  color: #409eff;
}
.current_MenuBar {
  a {
    color: #409eff !important;
  }

  background-color: #ecf5ff;
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
