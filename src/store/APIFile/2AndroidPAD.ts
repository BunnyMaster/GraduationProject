import { reqAndroidPADAddItem, reqAndroidPADList } from "@/api/requestApi.js";
import { ElMessage } from "element-plus";

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
  },
  actions: {
    // TODO 获取全部列表
    async GETAndroidPADList({ commit }: any, data: any) {
      const result = await reqAndroidPADList(data);
      if (result.code === 200) {
        commit("GETANDROIDPADLIST", result);
      } else {
        Promise.reject(new Error("获取AndroidPAD全部列表失败"));
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
        Promise.reject(new Error("添加AndroidPAD列表失败"));
      }
    },
    //   TODO 修改 AllTableList 值
    async ChangeAllTableList({ commit }: any, DataLIst: any) {
      commit("ChangeAllTableList", DataLIst);
    },
  },
};
export default AndroidPAD;
