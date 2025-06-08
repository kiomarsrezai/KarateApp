import { apiRequest } from "~/lib/api-request";
import { BoardMember } from "./types";

export const getBoardMembersApi = async () => {
  const res = await apiRequest<BoardMember[]>("/BoardMembers/GetAll", {
    method: "GET",
  });
  return res;
};
