import { apiRequest } from "~/lib/api-request";
import { Club } from "./types";

export const getClubsApi = async () => {
  const res = await apiRequest<Club[]>("/Club/GetAll", { method: "GET" });
  return res;
};
