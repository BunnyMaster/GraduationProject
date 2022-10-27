import { reqCompany } from "@/api/requestApi.js";
import { reqCompanySearch, reqDeleteCompany, reqCompanyAddItem, reqfactorySearch, reqDeletefactory, reqfactoryAddItem } from "@/api/Search_DeleteAPI.js";

const Enterprise = {
  state: {
    EnterpriseLsit: [{}],
    countPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETENTERPRISE(state: any, result: any) {
      state.EnterpriseLsit = result.data;
      if (result.data[0].countNum) state.countPage = result.data[0].countNum;
      if (result.countPage) state.countPage = result.countPage;
    },
  },
  actions: {
    //TODO 获取企业列表
    async GETEnterprise({ commit }: any, query: any) {
      const result = await reqCompany(query);
      if (result.code == 200) {
        commit("GETENTERPRISE", result);
      } else {
        return Promise.reject(new Error("获取企业列表失败"));
      }
    },

    //  TODO 搜索 法人
    async CompanySearch({ commit }: any, query: any) {
      const result = await reqCompanySearch(query);
      if (result.code == 200) {
        commit("GETENTERPRISE", result);
      } else {
        return Promise.reject(new Error("搜索失败"));
      }
    },

    // TODO 删除
    async DeleteCompany({ commit }: any, query: any) {
      const result = await reqDeleteCompany(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },

    // TODO 添加
    async CompanyAddItem({ commit }: any, query: any) {
      const result = await reqCompanyAddItem(query);
      if (result.code == 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },

    //  -------------------------------------------------------------------------
    //  TODO 搜索 法人
    async factorySearch({ commit }: any, query: any) {
      const result = await reqfactorySearch(query);
      if (result.code == 200) {
        commit("GETENTERPRISE", result);
      } else {
        return Promise.reject(new Error("搜索失败"));
      }
    },

    // TODO 删除
    async Deletefactory({ commit }: any, query: any) {
      const result = await reqDeletefactory(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },

    // TODO 添加
    async factoryAddItem({ commit }: any, query: any) {
      const result = await reqfactoryAddItem(query);
      if (result.code == 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
  },
  modules: {},
};
export default Enterprise;
