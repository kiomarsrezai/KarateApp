import { apiRequest } from "~/lib/api-request";
import { useAuthStore } from "./login-process/useAuthStore";
import { User } from "../user/types";

// send otp
type SendOtpBody = {
  phoneNumber: string;
};

type SendOtpResult = {
  message: string;
  code: string;
};

export const sendOtpApi = async (data: SendOtpBody) => {
  const res = await apiRequest<SendOtpResult>("/User/SendOtp", {
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
  nationalCode: string;
  address: string;
  pOstalCode: string;
  phoneNumberFamily: string;
  birthDate: Date;
  cityId: number;
  rezumeFile: string | null;
  selectedRoles: number[];
};

export const completeProfileApi = async (data: CompleteProfileBody) => {
  const authStore = useAuthStore.getState();
  const res = apiRequest<User>("/User/CompleteProfile", {
    method: "POST",
    body: {
      ...data,
      isMobileVerified: true,
      birthDay: "Test",
      userType: 1,
      email: "",
      password: "",
      avatar: "",
    },
    forceToken: authStore.token ?? undefined,
  });

  return res;
};

// get user by token
export const getUserByToken = async (token: string) => {
  const res = apiRequest<User>("/User/GetUserInfoByToken", {
    method: "GET",
    forceToken: token,
  });

  return res;
};
