import { reqDeleteRepairDispach, reqGETequipmentledger, reqRepairDispach, ReqRepairList, reqRepairReacrd } from "@/api/requestApi.js";

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
  },
  actions: {
    //  TODO 维修订单
    async GetRepairCordList({ commit }: any, query: any) {
      const result = await reqRepairReacrd(query);
      if (result.code === 200) {
        commit("GETREPAIRCORDLIST", result);
      } else {
        Promise.reject(new Error("获取电子秤信息失败"));
      }
    },
    //  TODO 提交错误信息
    async ReqRepairList({ commit }: any, query: any) {
      const result = await ReqRepairList(query);
      if (result.code === 200) {
        return "ok";
      } else {
        Promise.reject(new Error("添加失败"));
      }
    },
    //   TODO 修改已派工状态
    async handleEditDsipach({ commit }: any, query: any) {
      const result = await reqRepairDispach(query);
      if (result.code == 200) {
        return;
      } else {
        Promise.reject(new Error("修改工单状态失败"));
      }
    },
    //  TODO 删除工单
    async DeleteRepairDispach({ commit }: any, query: any) {
      const result = await reqDeleteRepairDispach(query);
      if (result.code == 200) {
        return;
      } else {
        Promise.reject(new Error("删除工单失败"));
      }
    },
    //  TODO 获取设备台账信息
    async GETequipmentledger({ commit }: any, query: any) {
      const result = await reqGETequipmentledger(query);
      console.log(result);
      if (result.code == 200) {
        commit("GETEQUIPMENTLEDGER", result);
      } else {
        Promise.reject(new Error("获取设备台账失败"));
      }
    },
  },
  modules: {},
};
export default RepairCord;
