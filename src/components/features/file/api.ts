import { apiRequest } from "~/lib/api-request";

type Body = {
  type: string;
  file: File;
  onProgress?: (percent: number) => void;
};

type Result = {
  success: true;
  path: string;
  fileName: string;
};

export const uploadFileApi = async ({ file, type, onProgress }: Body) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiRequest<Result>(`/FileUpload/UploadFile?type=${type}`, {
    method: "POST",
    formData,
    onUploadProgress: onProgress,
  });
  return res;
};
