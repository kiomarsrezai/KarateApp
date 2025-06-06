import { apiRequest } from "~/lib/api-request";

// send otp
type SendOtpBody = {
  phoneNumber: string;
};

type SendOtpResult = {
  message: string;
  code: string;
};

export const sendOtpApi = async (data: SendOtpBody) => {
  const res = await apiRequest<SendOtpResult>("/User/sendotp", {
    method: "POST",
    body: data,
  });

  return res;
};

// verify otp
type VerifyOtpBody = {
  phoneNumber: string;
  code: string;
};

type VerifyOtpResult = {
  token: string;
};

export const verifyOtpApi = async (data: VerifyOtpBody) => {
  const res = apiRequest<VerifyOtpResult>("/User/verifyotp", {
    method: "POST",
    body: {
      dto: {
        phoneNumber: data.phoneNumber,
        code: data.code,
      },
    },
  });

  return res;
};
