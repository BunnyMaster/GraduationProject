import { reqGETProcessMaintenance, reqGETProcessFlowMaintenance, reqGETProcessMaintenanceANDFlowMaintenance } from "@/api/requestApi.js";
import {
  reqProcessMaintenanceSearch,
  reqProcessMaintenanceDelete,
  reqProcessMaintenanceAddItem,
  reqProcessFlowMaintenanceSearch,
  reqProcessFlowMaintenanceDelete,
  reqProcessFlowMaintenanceAddItem,
} from "@/api/Search_DeleteAPI.js";
const ProcessMaintenanceANDFlowMaintenance = {
  state: {
    ProcessMaintenanceLsit: [{}],
    ProcessMaintenanceCountPage: 10,
    ProcessFlowMaintenanceLsit: [{}],
    ProcessFlowMaintenanceCountPage: 10,
    ProcessMaintenanceANDFlowMaintenanceLsit: [{}],
    ProcessMaintenanceANDFlowMaintenanceCountPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETPROCESSMAINTENANCE(state: any, result: any) {
      state.ProcessMaintenanceLsit = result.data;
      if (result.countPage) state.ProcessMaintenanceCountPage = result.countPage;
    },
    //  获取获取打印机列表
    GETPROCESSMAINTENANCESEARCH(state: any, result: any) {
      state.ProcessMaintenanceLsit = result.data;
      state.ProcessMaintenanceCountPage = result.countPage;
    },
    //  获取获取打印机列表
    GETPROCESSFLOWMAINTENANCE(state: any, result: any) {
      state.ProcessFlowMaintenanceLsit = result.data;
      if (result.countPage) state.ProcessFlowMaintenanceCountPage = result.countPage;
    },
    //  获取获取打印机列表
    GETPROCESSFLOWMAINTENANCESEARCH(state: any, result: any) {
      state.ProcessFlowMaintenanceLsit = result.data;
      state.ProcessFlowMaintenanceCountPage = result.pageSize;
    },
    //  获取获取打印机列表
    GETPROCESSMAINTENANCEANDFLOWMAINTENANCE(state: any, result: any) {
      state.ProcessMaintenanceANDFlowMaintenanceLsit = result.data;
      if (result.countPage) state.ProcessMaintenanceANDFlowMaintenanceCountPage = result.countPage;
    },
  },
  actions: {
    // TODO 获取获取工艺数据  ProcessMaintenance-ProcessFlowMaintenance
    async GETProcessMaintenance({ commit }: any, query: any) {
      const result = await reqGETProcessMaintenance(query);
      if (result.code == 200) {
        commit("GETPROCESSMAINTENANCE", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
    // TODO 获取工艺流程数据  ProcessMaintenance-ProcessFlowMaintenance
    async GETProcessFlowMaintenance({ commit }: any, query: any) {
      const result = await reqGETProcessFlowMaintenance(query);
      if (result.code == 200) {
        commit("GETPROCESSFLOWMAINTENANCE", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
    // TODO 获取工艺和流程 ProcessMaintenance-ProcessFlowMaintenance单信息ProcessMaintenanceANDFlowMaintenance
    async GETProcessMaintenanceANDFlowMaintenance({ commit }: any, query: any) {
      const result = await reqGETProcessMaintenanceANDFlowMaintenance(query);
      if (result.code == 200) {
        commit("GETPROCESSMAINTENANCEANDFLOWMAINTENANCE", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
    //  TODO 搜索员工列表
    async ProcessMaintenanceSearch({ commit }: any, query: any) {
      const result = await reqProcessMaintenanceSearch(query);
      if (result.code == 200) {
        commit("GETPROCESSMAINTENANCESEARCH", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 删除员工表
    async ProcessMaintenanceDelete({ commit }: any, query: any) {
      const result = await reqProcessMaintenanceDelete(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 添加信息
    async ProcessMaintenanceAddItem({ commit }: any, query: any) {
      const result = await reqProcessMaintenanceAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
    //  ---------------------------------------
    //  TODO 搜索员工列表
    async ProcessFlowMaintenanceSearch({ commit }: any, query: any) {
      const result = await reqProcessFlowMaintenanceSearch(query);
      if (result.code == 200) {
        commit("GETPROCESSFLOWMAINTENANCESEARCH", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 删除员工表
    async ProcessFlowMaintenanceDelete({ commit }: any, query: any) {
      const result = await reqProcessFlowMaintenanceDelete(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 添加信息
    async ProcessFlowMaintenanceAddItem({ commit }: any, query: any) {
      const result = await reqProcessFlowMaintenanceAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
  },
  modules: {},
};
export default ProcessMaintenanceANDFlowMaintenance;
