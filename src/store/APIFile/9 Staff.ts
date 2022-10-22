import { reqstaff, reqWorkshop } from "@/api/requestApi.js";

const Staff = {
  state: {
    StaffLsit: [{}],
    countPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETSTAFF(state: any, result: any) {
      state.StaffLsit = result.data;
      if (result.countPage) state.countPage = result.countPage;
    },
  },
  actions: {
    //TODO 工厂等
    async GETStaff({ commit }: any, query: any) {
      const result = await reqstaff(query);
      if (result.code == 200) {
        commit("GETSTAFF", result);
      } else {
        Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
  },
  modules: {},
};
export default Staff;
