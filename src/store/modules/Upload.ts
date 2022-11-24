import { UploadHeaderImages } from "@/api/Upload.js";
const Upload = {
  state: {
    UploadHeaderImages: "",
    UploadHeaderImagesAction: "",
  },
  mutations: {
    UPLOADHEADERIMAGES(state: any, result: any) {},
  },
  actions: {
    async UploadHeaderImages({ commit }: any, data: any) {
      const result = await UploadHeaderImages(data);
      if (result.code !== 200) Promise.reject(new Error("上传头像失败"));
    },
  },
  modules: {},
};
export default Upload;
