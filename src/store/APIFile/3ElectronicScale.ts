import { reqElectronicScale } from "@/api/requestApi.js";

const ElectronicScale = {
  state: {
    ElectronicScaleAllLIst: [{}],
    CountPage: 10,
  },
  getters: {},
  mutations: {
    GETELECTRONICSCALELIST(state: any, result: any) {
      state.ElectronicScaleAllLIst = result.data;
      state.CountPage = result.data[0].countNum;
    },
  },
  actions: {
    //  TODO 获取电子秤全部
    async GetElectronicScaleList({ commit }: any, query: any) {
      const result = await reqElectronicScale(query);
      if (result.code === 200) {
        commit("GETELECTRONICSCALELIST", result);
      } else {
        Promise.reject(new Error("获取电子秤信息失败"));
      }
    },
  },
  modules: {},
};
export default ElectronicScale;
