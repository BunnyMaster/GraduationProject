import { reqFindDate } from "@/api/requestApi.js";

const FindDate = {
  state: {
    ClickDateList: [],
  },
  mutations: {
    GETFINDDATE(state: any, result: any) {
      state.ClickDateList = result.data;
    },
  },
  actions: {
    async GETFindDate({ commit }: any, query: any) {
      const result = await reqFindDate(query);
      if (result.code == 200) {
        commit("GETFINDDATE", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
  },
  modules: {},
};
export default FindDate;
