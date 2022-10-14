// @ts-ignore
import { reqDeviceFaultReporting } from "@/api/requestApi.js";
import { AxiosResponse } from "axios";

const EquipmentManagement = {
  state: {
    DeviceFaultReportingList: {},
  },
  mutations: {
    DEVICEFAULTREPORTING(state: any, data: AxiosResponse) {
      state.DeviceFaultReportingList = data;
    },
  },
  actions: {
    //TODO 获取设备管理-故障上报
    async DeviceFaultReporting({ commit }: any) {
      const result = await reqDeviceFaultReporting();
      if (result.code === 200) {
        commit("DEVICEFAULTREPORTING", result.data);
      } else {
        Promise.reject(new Error("获取设备管理-列表查询失败-故障上报"));
      }
    },
  },
  getters: {},
};
export default EquipmentManagement;
