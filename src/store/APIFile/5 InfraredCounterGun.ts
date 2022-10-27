import { reqInfraredCounterGunadd, reqInfraredCounterGun } from "@/api/requestApi.js";
import { reqInfraredCounterGunAddItem, reqInfraredCounterGunSearch, reqInfraredCounterGunDelete } from "@/api/Search_DeleteAPI.js";
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
      state.countPage = result.AllPage;
    },
  },
  actions: {
    //  TODO 添加打印机列表
    async InfraredCounterGunadd({ commit }: any) {
      const result = await reqInfraredCounterGunadd();
      if (result.code == 200) {
        return result;
      } else {
        return Promise.reject(new Error("获取打印机列表失败"));
      }
    },
    //  TODO 获取打印机列表
    async GetInfraredCounterGunList({ commit }: any, query: any) {
      const result = await reqInfraredCounterGun(query);
      if (result.code == 200) {
        commit("GETINFRAREDCOUNTERGUNLIST", result);
      } else {
        return Promise.reject(new Error("获取打印机列表失败"));
      }
    },
    //  TODO 添加信息
    async InfraredCounterGunAddItem({ commit }: any, query: any) {
      const result = await reqInfraredCounterGunAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
    //  TODO 搜索信息
    async InfraredCounterGunSearch({ commit }: any, query: any) {
      const result = await reqInfraredCounterGunSearch(query);
      if (result.code === 200) {
        commit("GETINFRAREDCOUNTERGUNLIST", result);
      } else {
        return Promise.reject(new Error("获取信息失败"));
      }
    },
    //  TODO 删除电信息
    async InfraredCounterGunDelete({ commit }: any, query: any) {
      const result = await reqInfraredCounterGunDelete(query);
      if (result.code === 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取信息失败"));
      }
    },
  },
  modules: {},
};
export default InfraredCounterGun;
