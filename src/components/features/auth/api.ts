import { apiRequest } from "~/lib/api-request";
import { useAuthStore } from "./login-process/useAuthStore";

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
      dto: data,
    },
  });

  return res;
};

// complete profile
type CompleteProfileBody = {
  name: string;
  family: string;
  fatherName: string;
  isMobileVerified: boolean;
  nationalCode: string;
  address: string;
  pOstalCode: string;
  phoneNumberFamily: string;
  birthDay: string;
  birthDate: Date;
  cityId: number;
  userType: number;
  email: string;
  password: string;
  avatar: string;
  rezumeFile: string;
  selectedRoles: number[];
};

type CompleteProfileResult = {};

export const completeProfileApi = async (data: CompleteProfileBody) => {
  const authStore = useAuthStore.getState();
  const res = apiRequest<CompleteProfileResult>("/User/completeprofile", {
    method: "POST",
    body: data,
    forceToken: authStore.token ?? undefined,
  });

  return res;
};
