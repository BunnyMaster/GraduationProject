import { reqGETPerformance, reqGETPerformanceConfig, reqGETPerformanceStaff } from "@/api/requestApi.js";
import {
  reqPerformanceStaffSearch,
  reqPerformanceConfigSearch,
  reqPerformanceSearch,
  reqPerformanceStaffDelete,
  reqPerformanceConfigDelete,
  reqElectronicScaleAddItem,
  reqPerformanceStaffAddItem,
  reqPerformanceConfigAddItem,
} from "@/api/Search_DeleteAPI.js";

const Performance = {
  state: {
    PerformanceSatffList: [{}],
    PerformanceSatffCountPage: 10,
    PerformanceConfigList: [{}],
    PerformanceConfigCountPage: 10,
    GETPerformanceList: [{}],
    GETPerformanceCountPage: 10,
  },
  mutations: {
    //  TODO 获取员工列表
    GETPERFORMANCESATFFLIST(state: any, result: any) {
      state.PerformanceSatffList = result.data;
      state.PerformanceSatffCountPage = result.pageSize;
    },
    //  TODO 获取配置列表
    GETPERFORMANCECONFIG(state: any, result: any) {
      state.PerformanceConfigList = result.data;
      state.PerformanceConfigCountPage = result.pageSize;
    },
    //  TODO 获取总列表
    GETPERFORMANCE(state: any, result: any) {
      state.GETPerformanceList = result.data;
      state.GETPerformanceCountPage = result.pageSize;
    },
  },
  actions: {
    //  TODO 获取员工列表
    async GetPerformanceSatffList({ commit }: any, query: any) {
      const result = await reqGETPerformanceStaff(query);
      if (result.code == 200) {
        commit("GETPERFORMANCESATFFLIST", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 获取配置列表
    async GETPerformanceConfig({ commit }: any, query: any) {
      const result = await reqGETPerformanceConfig(query);
      if (result.code == 200) {
        commit("GETPERFORMANCECONFIG", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 获取总列表
    async GETPerformance({ commit }: any, query: any) {
      const result = await reqGETPerformance(query);
      if (result.code == 200) {
        commit("GETPERFORMANCE", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 搜索员工列表
    async GETPerformanceStaffSearch({ commit }: any, query: any) {
      const result = await reqPerformanceStaffSearch(query);
      if (result.code == 200) {
        commit("GETPERFORMANCESATFFLIST", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 搜索配置列表
    async GETPerformanceConfigSearch({ commit }: any, query: any) {
      const result = await reqPerformanceConfigSearch(query);
      if (result.code == 200) {
        commit("GETPERFORMANCECONFIG", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 搜索总列表
    async GETPerformanceSearch({ commit }: any, query: any) {
      const result = await reqPerformanceSearch(query);
      if (result.code == 200) {
        commit("GETPERFORMANCE", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 删除员工表
    async PerformanceStaffDelete({ commit }: any, query: any) {
      const result = await reqPerformanceStaffDelete(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 删除配置表
    async PerformanceConfigDelete({ commit }: any, query: any) {
      const result = await reqPerformanceConfigDelete(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 添加信息
    async PerformanceStaffAddItem({ commit }: any, query: any) {
      const result = await reqPerformanceStaffAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
    //  TODO 添加信息
    async PerformanceConfigAddItem({ commit }: any, query: any) {
      const result = await reqPerformanceConfigAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
  },
  modules: {},
};
export default Performance;
