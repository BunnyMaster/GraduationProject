import { reqBarcodePrinter, reqBarcodePrinteradd } from "@/api/requestApi.js";
import { reqBarcodePrinterSearchAddItem, reqBarcodePrinterDelete, reqBarcodePrinterAddItem } from "@/api/Search_DeleteAPI.js";

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
    //  获取获取打印机列表
    BARCODEPRINTERSEARCH(state: any, result: any) {
      state.BarcodePrinterLsit = result.data;
      state.countPage = result.AllPage;
    },
  },
  actions: {
    //  TODO 获取打印机列表
    async GetBarcodePrinter({ commit }: any, query: any) {
      const result = await reqBarcodePrinter(query);
      if (result.code == 200) {
        commit("GETBARCODEPRINTER", result);
      } else {
        return Promise.reject(new Error("获取打印机列表失败"));
      }
    },
    //  TODO 添加打印机列表
    async addBarcodePrinter({ commit }: any) {
      const result = await reqBarcodePrinteradd();
      if (result.code == 200) {
        return result;
      } else {
        return Promise.reject(new Error("获取打印机列表失败"));
      }
    },
    //  TODO 添加信息
    async BarcodePrinterSearchAddItem({ commit }: any, query: any) {
      const result = await reqBarcodePrinterAddItem(query);
      if (result.code === 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
    //  TODO 删除电信息
    async BarcodePrinterDelete({ commit }: any, query: any) {
      const result = await reqBarcodePrinterDelete(query);
      if (result.code === 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取信息失败"));
      }
    },
    //  TODO 搜索信息
    async BarcodePrinterSearch({ commit }: any, query: any) {
      const result = await reqBarcodePrinterSearchAddItem(query);
      if (result.code === 200) {
        commit("BARCODEPRINTERSEARCH", result);
      } else {
        return Promise.reject(new Error("获取信息失败"));
      }
    },
  },
  modules: {},
};
export default BarcodePrinter;
