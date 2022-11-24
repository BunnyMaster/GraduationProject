import { reqHomeMainPage, reqSlideShow } from "@/api/requestApi.js";

const HomeMainPage = {
  state: {
    HomeNav: [],
    qwrzCount: [{}],
    SlideShowList: [{}],
    hyalList: [{}],
    wtbList: {},
    yqljList: [{}],
  },
  mutations: {
    GETHOMENAV(state: any, result: any) {
      state.HomeNav = result.data.homeNav;
      state.qwrzCount = result.data.qwrzCount;
      state.hyalList = result.data.hyal;
      state.wtbList = result.data.wtb;
      state.yqljList = result.data.yqlj;
    },
    GETSLIDESHOW(state: any, result: any) {
      state.SlideShowList = result.data.slide;
    },
  },
  actions: {
    // 菜单栏列表
    async GetHomeNav({ commit }: any) {
      const result = await reqHomeMainPage();
      if (result.code === 200) {
        commit("GETHOMENAV", result);
      } else {
        Promise.reject(new Error("菜单栏列表获取失败"));
      }
    },
    // 获取轮播图
    async GetSlideShow({ commit }: any) {
      const result = await reqSlideShow();
      if (result.code === 200) {
        commit("GETSLIDESHOW", result);
      } else {
        Promise.reject(new Error("获取轮播图失败"));
      }
    },
  },
  modules: {},
};
export default HomeMainPage;
