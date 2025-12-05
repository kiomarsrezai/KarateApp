import { apiRequest } from "~/lib/api-request";
import {
  CommitteeExamRequest,
  CommitteeDecisionDto,
} from "./types";

export const getCommitteeExamRequestsApi = (params?: {
  status?: string;
}) => {
  return apiRequest<CommitteeExamRequest[]>("/CommitteeExamRequests/My", {
    method: "GET",
    params,
  });
};

export const committeeDecideExamRequestApi = (
  id: number,
  data: CommitteeDecisionDto
) => {
  return apiRequest<{ message: string }>(
    `/CommitteeExamRequests/${id}/Decide`,
    {
      method: "POST",
      body: data,
    }
  );
};
