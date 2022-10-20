// @ts-ignore
import { reqDeviceFaultReporting, reqMenuBarList } from "@/api/requestApi.js";
const MenuBar = {
  state: {
    isCollapse: true,
    MenuBarList: [{}],
    DevicTtype: [{}],
  },
  mutations: {
    //修改状态栏 isCollapse
    CHANGEISCOLLAPSE(state: any, data: boolean) {
      state.isCollapse = data;
    },
    // 获取菜单栏数据
    GETMENUBARLIST(state: any, data: boolean) {
      state.MenuBarList = data;
    },
    //  获取设备列表
    GetDevicTtypeList(state: any, data: boolean) {
      state.DevicTtype = data;
    },
  },
  actions: {
    //修改 isCollapse
    ChangeisCollapse({ commit }: any, flag: boolean) {
      commit("CHANGEISCOLLAPSE", flag);
    },
    //  获取菜单栏数据
    async GetMenuBarList({ commit }: any) {
      const result = await reqMenuBarList();
      result.code === 200 ? commit("GETMENUBARLIST", result.data) : Promise.reject(new Error("获取菜单栏数据失败"));
    },
    // 获取设备列表
    async GetDevicTtypeList({ commit }: any) {
      const result = await reqDeviceFaultReporting();
      result.code === 200 ? commit("GetDevicTtypeList", result.data) : Promise.reject(new Error("获取设备列表失败"));
    },
  },
};

export default MenuBar;
