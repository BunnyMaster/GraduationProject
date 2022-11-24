import { reqChangeUserInfo, reqLogin, reqLoginHome, reqRegister, reqReoairList } from "@/api/requestApi.js";

const Login = {
  state: {
    UserInfo: {
      Id_Index: 1,
      id: "5d0541c4f194",
      UserName: "admin",
      UserPwd: "admin123456",
      CreateTime: "2022-10-05T11:22:00.000Z",
      Email: "1319900154",
      Phone: "18012062876",
      Name: "管理员",
      Age: 16,
      QQ: 1319900154,
      WeChat: "zkw_0212",
    },
    RepairBill: [{ id: 1, Name: "admin", Time: "2022-10-19T16:00:00.000Z", State: "未修", City: "江苏苏州" }],
  },
  getters: {},
  mutations: {
    //  获取用户信息
    GETLOGININFO(state: any, data: any) {
      state.UserInfo = data[0];
    },
    //  获取维修单
    GETREPAIRBILL(state: any, data: any) {
      state.RepairBill = data.data;
    },
    //  用户登录
    PSOTLOGIN(state: any, data: any) {
      state.UserInfo = data.data[0];
    },
  },
  actions: {
    //  TODO 获取用户信息
    async GetLoginInfo({ commit }: any, query: string) {
      const result = await reqLoginHome(query);
      if (result.code === 200) {
        commit("GETLOGININFO", result.data);
      } else {
        return Promise.reject(new Error("获取用户信息失败"));
      }
    },
    //  TODO 获取维修单
    async GetRepairBill({ commit }: any, query: any) {
      const result = await reqReoairList(query);
      if (result.code === 200) {
        commit("GETREPAIRBILL", result);
      } else {
        return Promise.reject(new Error("获取维修单失败"));
      }
    },
    //   TODO 用户注册
    async PostRegister({ commit }: any, data: any) {
      const result = await reqRegister(data);
      if (result.code === 200) {
        return result;
      } else {
        return Promise.reject(new Error(`注册失败 ${result.message}`));
      }
    },
    //   TODO 用户登录
    async PostLogin({ commit }: any, data: any) {
      const result = await reqLogin(data);
      if (result.code === 200) {
        commit("PSOTLOGIN", result);
      } else {
        return Promise.reject(new Error("登录失败"));
      }
      return result;
    },
    //   TODO 修改用户信息
    async ChangeUserInfo({ commit }: any, data: any) {
      const result = await reqChangeUserInfo(data);
      if (result.code === 200) {
        return "修改成功";
      } else {
        return Promise.reject(new Error("修改失败"));
      }
      return result;
    },
  },
  modules: {},
};
export default Login;
