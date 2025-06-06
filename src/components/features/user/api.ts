import { apiRequest } from "~/lib/api-request";

// find me
export const findMeApi = (token: string) => {
  return apiRequest("/User/GetUserInfoByToken", {
    method: "GET",
    forceToken: token,
  });
};
