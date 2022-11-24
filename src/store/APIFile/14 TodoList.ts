import { reqChangeTodolistCountent, reqtodolistAddItem, reqtodolistAll, reqtodolistSearch, reqtodolistUpdatecomplet, reqtodolistUpdateDelete } from "@/api/Search_DeleteAPI.js";

const TodolistAll = {
  state: {
    TodolistAllLsit: [{}],
    TodolistPageSize: 10,
  },
  mutations: {
    GETTODOLISTALL(state: any, result: any) {
      state.TodolistAllLsit = result.data;
      state.TodolistPageSize = result.countPage;
    },
  },
  actions: {
    // 获取全部
    async GETtodolistAll({ commit }: any, query: any) {
      const result = await reqtodolistAll(query);
      if (result.code == 200) {
        commit("GETTODOLISTALL", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    // 去搜索
    async todolistSearch({ commit }: any, query: any) {
      const result = await reqtodolistSearch(query);
      if (result.code == 200) {
        commit("GETTODOLISTALL", result);
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    // 删除
    async todolistUpdateDelete({ commit }: any, query: any) {
      const result = await reqtodolistUpdateDelete(query);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("获取列表失败"));
      }
    },
    // 添加
    async todolistAddItem({ commit }: any, query: any) {
      const result = await reqtodolistAddItem(query);
      if (result.code == 200) {
        return "添加成功";
      } else {
        return Promise.reject(new Error("添加失败"));
      }
    },
    //  修改完成状态
    async todolistUpdatecomplet({ commit }: any, query: any) {
      const result = await reqtodolistUpdatecomplet(query);
      if (result.code == 200) {
        return "修改成功";
      } else {
        return Promise.reject(new Error("修改失败"));
      }
    },
    //  修改内容
    async ChangeTodolistCountent({ commit }: any, query: any) {
      const result = await reqChangeTodolistCountent(query);
      if (result.code == 200) {
        return "修改成功";
      } else {
        return Promise.reject(new Error("修改失败"));
      }
    },
  },
  modules: {},
};
export default TodolistAll;
