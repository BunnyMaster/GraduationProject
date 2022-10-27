import { reqGETOrderManagement, reqGETRepairOrderMaintenance } from "@/api/requestApi.js";
import {
  reqDeleteOrderManagement,
  reqOrderManagementAddItem,
  reqOrderManagementSearch,
  reqRepairOrderMaintenanceSearch,
  reqDeleteRepairOrderMaintenance,
  reqRepairOrderMaintenanceAddItem,
} from "@/api/Search_DeleteAPI.js";

const OrderManagement = {
  state: {
    OrderManagementLsit: [{}],
    OrderManagementCountPage: 10,
    RepairOrderMaintenancetLsit: [{}],
    RepairOrderMaintenancetCountPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETORDERMANAGEMENT(state: any, result: any) {
      state.OrderManagementLsit = result.data;
      if (result.countPage) state.OrderManagementCountPage = result.countPage;
    },
    //  获取获取打印机列表
    GETREPAIRORDERMAINTENANCE(state: any, result: any) {
      state.RepairOrderMaintenancetLsit = result.data;
      if (result.countPage) state.RepairOrderMaintenancetCountPage = result.countPage;
    },
  },
  actions: {
    //TODO 订单管理
    async GETOrderManagement({ commit }: any, query: any) {
      const result = await reqGETOrderManagement(query);
      if (result.code == 200) {
        commit("GETORDERMANAGEMENT", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
    //TODO 维护订单
    async GETRepairOrderMaintenancet({ commit }: any, query: any) {
      const result = await reqGETRepairOrderMaintenance(query);
      if (result.code == 200) {
        commit("GETREPAIRORDERMAINTENANCE", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
    // ------------------------------------------------
    //  TODO 搜索主要负责人名
    async OrderManagementSearch({ commit }: any, query: any) {
      const result = await reqOrderManagementSearch(query);
      if (result.code == 200) {
        commit("GETORDERMANAGEMENT", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },

    // TODO 删除
    async DeleteOrderManagement({ commit }: any, query: any) {
      const result = await reqDeleteOrderManagement(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },

    // TODO 添加
    async OrderManagementAddItem({ commit }: any, query: any) {
      const result = await reqOrderManagementAddItem(query);
      if (result.code == 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
    // -----------------------------------------------------------
    //  TODO 搜索主要负责人名
    async RepairOrderMaintenanceSearch({ commit }: any, query: any) {
      const result = await reqRepairOrderMaintenanceSearch(query);
      if (result.code == 200) {
        commit("GETREPAIRORDERMAINTENANCE", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },

    // TODO 删除
    async DeleteRepairOrderMaintenance({ commit }: any, query: any) {
      const result = await reqDeleteRepairOrderMaintenance(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },

    // TODO 添加
    async RepairOrderMaintenanceAddItem({ commit }: any, query: any) {
      const result = await reqRepairOrderMaintenanceAddItem(query);
      if (result.code == 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
  },
  modules: {},
};
export default OrderManagement;
