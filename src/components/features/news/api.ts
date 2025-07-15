import { apiRequest } from "~/lib/api-request";
import { News } from "./types";

export const getNewsApi = async () => {
  const res = await apiRequest<News[]>("/News", { method: "GET" });
  return res;
};

export const getSingleNewsApi = async (id: number) => {
  const res = await apiRequest<News>(`/News/GetById/${id}`, { method: "GET" });
  return res;
};
