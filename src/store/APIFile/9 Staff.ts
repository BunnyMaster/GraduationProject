import { reqstaff } from "@/api/requestApi.js";
import { reqPerformanceStaffDelete, reqPerformanceStaffSearch } from "@/api/Search_DeleteAPI.js";

const Staff = {
  state: {
    StaffLsit: [{}],
    countPage: 10,
    MountGuardRecordsLsit: [{}],
    MountGuardRecordsCountPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETSTAFF(state: any, result: any) {
      state.StaffLsit = result.data;
      if (result.countPage) state.countPage = result.countPage;
    },
    //  员工上岗记录
    GETMOUNTGUARDRECORDS(state: any, result: any) {
      state.MountGuardRecordsLsit = result.data;
      if (result.countPage) state.MountGuardRecordsCountPage = result.countPage;
    },
  },
  actions: {
    //TODO 工厂等
    async GETStaff({ commit }: any, query: any) {
      const result = await reqstaff(query);
      if (result.code == 200) {
        commit("GETSTAFF", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
      }
    },
    //  TODO 上岗记录
    async GETMountGuardRecords({ commit }: any, query: any) {
      const result = await reqstaff(query);
      if (result.code == 200) {
        commit("GETMOUNTGUARDRECORDS", result);
      } else {
        return Promise.reject(new Error("获取列表失败-CODE 1"));
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
    //  TODO 搜索员工列表
    async GETPerformanceStaffSearch({ commit }: any, query: any) {
      const result = await reqPerformanceStaffSearch(query);
      if (result.code == 200) {
        commit("GETSTAFF", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
  },
  modules: {},
};
export default Staff;
