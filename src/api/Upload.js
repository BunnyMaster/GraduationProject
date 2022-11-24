import Request from "@/utils/request";

export const UploadHeaderImages = file => {
  return Request({
    url: `/UploadImages`,
    data: file,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
  });
};
