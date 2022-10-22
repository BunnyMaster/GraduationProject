import { reqBarcodePrinter, reqBarcodePrinteradd } from "@/api/requestApi.js";

const BarcodePrinter = {
  state: {
    BarcodePrinterLsit: [{}],
    countPage: 10,
  },
  getters: {},
  mutations: {
    //  获取获取打印机列表
    GETBARCODEPRINTER(state: any, result: any) {
      state.BarcodePrinterLsit = result.data;
      state.countPage = result.data[0].countNum;
    },
  },
  actions: {
    //  TODO 获取打印机列表
    async GetBarcodePrinter({ commit }: any, query: any) {
      const result = await reqBarcodePrinter(query);
      if (result.code == 200) {
        commit("GETBARCODEPRINTER", result);
      } else {
        Promise.reject(new Error("获取打印机列表失败"));
      }
    },
    //  TODO 添加打印机列表
    async addBarcodePrinter({ commit }: any) {
      const result = await reqBarcodePrinteradd();
      if (result.code == 200) {
        return result;
      } else {
        Promise.reject(new Error("获取打印机列表失败"));
      }
    },
  },
  modules: {},
};
export default BarcodePrinter;
