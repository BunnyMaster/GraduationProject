import { reqInfraredCounterGunadd, reqInfraredCounterGun } from "@/api/requestApi.js";
import { reqGetMakeList } from "@/api/tec029Web_ReuqestAPI.js";
const InfraredCounterGun = {
  state: {
    InfraredCounterGunList: [{}],
    countPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETINFRAREDCOUNTERGUNLIST(state: any, result: any) {
      state.InfraredCounterGunList = result.data;
      state.countPage = result.data[0].countNum;
    },
  },
  actions: {
    //  TODO 添加打印机列表
    async InfraredCounterGunadd({ commit }: any) {
      const result = await reqInfraredCounterGunadd();
      if (result.code == 200) {
        return result;
      } else {
        Promise.reject(new Error("获取打印机列表失败"));
      }
    },
    //  TODO 获取打印机列表
    async GetInfraredCounterGunList({ commit }: any, query: any) {
      const result = await reqInfraredCounterGun(query);
      if (result.code == 200) {
        commit("GETINFRAREDCOUNTERGUNLIST", result);
      } else {
        Promise.reject(new Error("获取打印机列表失败"));
      }
    },
  },
  modules: {},
};
export default InfraredCounterGun;
