import { reqAndroidPADAddItem, reqAndroidPADList } from "@/api/requestApi.js";
import { ElMessage } from "element-plus";
import { reqAndroidPADDelete, reqAndroidPADSearch } from "@/api/Search_DeleteAPI.js";

const AndroidPAD = {
  state: {
    AllTableList: [],
    CountPage: 110,
  },
  getters: {},
  mutations: {
    GETANDROIDPADLIST(state: any, result: any) {
      state.AllTableList = result.data;
      state.CountPage = result.AllPage;
    },
    //  修改AllTable值
    ChangeAllTableList(state: any, result: any) {
      state.AllTableList = result;
    },
    //   搜索清空列表
    CLEARANDROIDPADLIST(state: any, result: any) {
      state.AllTableList = result.data;
      state.CountPage = result.AllPage;
    },
  },
  actions: {
    // TODO 获取全部列表
    async GETAndroidPADList({ commit }: any, data: any) {
      const result = await reqAndroidPADList(data);
      if (result.code === 200) {
        commit("GETANDROIDPADLIST", result);
      } else {
        return Promise.reject(new Error("获取AndroidPAD全部列表失败"));
      }
    },
    //  TODO 添加内容
    async POSTAndroidPADAddItem({ commit }: any, data: any) {
      const result = await reqAndroidPADAddItem(data);
      if (result.code === 200) {
        ElMessage({
          showClose: true,
          message: "添加成功",
          type: "success",
          center: true,
        });
      } else {
        return Promise.reject(new Error("添加AndroidPAD列表失败"));
      }
    },
    //   TODO 修改 AllTableList 值
    async ChangeAllTableList({ commit }: any, DataLIst: any) {
      commit("ChangeAllTableList", DataLIst);
    },
    // TODO 搜索关键字
    async GETAndroidPADSearch({ commit }: any, data: any) {
      const result = await reqAndroidPADSearch(data);
      if (result.code === 200) {
        commit("CLEARANDROIDPADLIST", result);
      } else {
        return Promise.reject(new Error("搜索失败"));
      }
    },
    //   TODO 删除
    async DelatwAndroidPAD({ commit }: any, data: any) {
      const result = await reqAndroidPADDelete(data);
      if (result.code === 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },
  },
};
export default AndroidPAD;
