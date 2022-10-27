import { reqWorkshop } from "@/api/requestApi.js";

const Workshop = {
  state: {
    WorkshopLsit: [{}],
    countPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETREQWORKSHOP(state: any, result: any) {
      state.WorkshopLsit = result.data;
      if (result.countPage) state.countPage = result.countPage;
    },
  },
  actions: {
    //TODO 工厂等
    async GETWorkshop({ commit }: any, query: any) {
      const result = await reqWorkshop(query);
      if (result.code == 200) {
        commit("GETREQWORKSHOP", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
  },
  modules: {},
};
export default Workshop;
