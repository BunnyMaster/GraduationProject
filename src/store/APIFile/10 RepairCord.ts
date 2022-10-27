import { reqDeleteRepairDispach, reqGETequipmentledger, reqRepairDispach, ReqRepairList, reqRepairReacrd } from "@/api/requestApi.js";
import { reqEquipmentLedgerSearch, reqEquipmentLedgerDelete, reqEquipmentLedgerAddItem } from "@/api/Search_DeleteAPI.js";

const RepairCord = {
  state: {
    RepairCordLIst: [{}],
    CountPage: 10,
    equipmentledgerLIst: [{}],
    equipmentledgerCountPage: 10,
  },
  getters: {},
  mutations: {
    // 获取维修订单
    GETREPAIRCORDLIST(state: any, result: any) {
      state.RepairCordLIst = result.data;
      if (result.CountNum) state.CountPage = result.CountNum;
    },
    // 获取设备台账信息
    GETEQUIPMENTLEDGER(state: any, result: any) {
      state.equipmentledgerLIst = result.data;
      if (result.CountNum) state.equipmentledgerCountPage = result.CountNum;
    },
    // 获取设备台账信息
    GETEQUIPMENTLEDGERSEARCH(state: any, result: any) {
      state.equipmentledgerLIst = result.data;
      state.equipmentledgerCountPage = result.pageSize;
    },
  },
  actions: {
    //  TODO 维修订单
    async GetRepairCordList({ commit }: any, query: any) {
      const result = await reqRepairReacrd(query);
      if (result.code === 200) {
        commit("GETREPAIRCORDLIST", result);
      } else {
        return Promise.reject(new Error("获取电子秤信息失败"));
      }
    },
    //  TODO 提交错误信息
    async ReqRepairList({ commit }: any, query: any) {
      const result = await ReqRepairList(query);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
    //   TODO 修改已派工状态
    async handleEditDsipach({ commit }: any, query: any) {
      const result = await reqRepairDispach(query);
      if (result.code == 200) {
        return;
      } else {
        return Promise.reject(new Error("修改工单状态失败"));
      }
    },
    //  TODO 删除工单
    async DeleteRepairDispach({ commit }: any, query: any) {
      const result = await reqDeleteRepairDispach(query);
      if (result.code == 200) {
        return;
      } else {
        return Promise.reject(new Error("删除工单失败"));
      }
    },
    //  TODO 获取设备台账信息
    async GETequipmentledger({ commit }: any, query: any) {
      const result = await reqGETequipmentledger(query);
      if (result.code == 200) {
        commit("GETEQUIPMENTLEDGER", result);
      } else {
        return Promise.reject(new Error("获取设备台账失败"));
      }
    },
    //  TODO 搜索员工列表
    async EquipmentLedgerSearch({ commit }: any, query: any) {
      const result = await reqEquipmentLedgerSearch(query);
      if (result.code == 200) {
        commit("GETEQUIPMENTLEDGERSEARCH", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 删除员工表
    async EquipmentLedgerDelete({ commit }: any, query: any) {
      const result = await reqEquipmentLedgerDelete(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    //  TODO 添加信息
    async EquipmentLedgerAddItem({ commit }: any, query: any) {
      const result = await reqEquipmentLedgerAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
  },
  modules: {},
};
export default RepairCord;
