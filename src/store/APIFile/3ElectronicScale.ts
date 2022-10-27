import { reqElectronicScale } from "@/api/requestApi.js";
import { reqElectronicScaleSearch, reqElectronicScaleDelete, reqElectronicScaleAddItem } from "@/api/Search_DeleteAPI.js";
const ElectronicScale = {
  state: {
    ElectronicScaleAllLIst: [{}],
    CountPage: 10,
  },
  getters: {},
  mutations: {
    // 获取
    GETELECTRONICSCALELIST(state: any, result: any) {
      state.ElectronicScaleAllLIst = result.data;
      state.CountPage = result.data[0].countNum;
    },
    //  搜索
    ELECTRONICSCALESEARCH(state: any, result: any) {
      state.ElectronicScaleAllLIst = result.data;
      state.CountPage = result.AllPage;
    },
  },
  actions: {
    //  TODO 获取电子秤全部
    async GetElectronicScaleList({ commit }: any, query: any) {
      const result = await reqElectronicScale(query);
      if (result.code === 200) {
        commit("GETELECTRONICSCALELIST", result);
      } else {
        return Promise.reject(new Error("获取电子秤信息失败"));
      }
    },
    //  TODO 删除电子秤信息
    async ElectronicScaleDelete({ commit }: any, query: any) {
      const result = await reqElectronicScaleDelete(query);
      if (result.code === 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取信息失败"));
      }
    },
    //  TODO 搜索电子秤信息
    async ElectronicScaleSearch({ commit }: any, query: any) {
      const result = await reqElectronicScaleSearch(query);
      if (result.code === 200) {
        commit("ELECTRONICSCALESEARCH", result);
      } else {
        return Promise.reject(new Error("获取信息失败"));
      }
    },
    //  TODO 添加信息
    async ElectronicScaleAddItem({ commit }: any, query: any) {
      const result = await reqElectronicScaleAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
  },
  modules: {},
};
export default ElectronicScale;
