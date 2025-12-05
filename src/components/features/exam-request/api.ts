import { apiRequest } from "~/lib/api-request";
import { ExamRequest } from "./types";

export type ExamRequestBody = {
  coachName: string;
  coachPhoneNumber: string;
  residenceLocation: string;
  requestedGrade: string;
  lastCertificateImagePath?: string | null;
};

export const getMyExamRequestApi = async () => {
  try {
    const res = await apiRequest<ExamRequest>("/ExamRequest/GetMy", {
      method: "GET",
    });
    return res;
  } catch (error: any) {
    // اگر 404 بود یعنی هنوز درخواستی ثبت نشده
    return null;
  }
};

export const createOrUpdateExamRequestApi = async (body: ExamRequestBody) => {
  const res = await apiRequest<ExamRequest>("/ExamRequest/CreateOrUpdate", {
    method: "POST",
    body,
  });
  return res;
};
