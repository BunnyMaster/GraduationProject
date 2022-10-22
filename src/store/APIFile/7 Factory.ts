import { reqfactory } from "@/api/requestApi.js";

const Factory = {
  state: {
    FactoryLsit: [{}],
    countPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETENTERPRISE(state: any, result: any) {
      state.FactoryLsit = result.data;
      if (result.data[0].countNum) state.countPage = result.data[0].countNum;
    },
  },
  actions: {
    //TODO 获取企业列表
    async GETFactory({ commit }: any, query: any) {
      const result = await reqfactory(query);
      if (result.code == 200) {
        commit("GETENTERPRISE", result);
      } else {
        Promise.reject(new Error("获取企业列表失败"));
      }
    },
  },
  modules: {},
};
export default Factory;
