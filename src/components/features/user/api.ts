import { apiRequest } from "~/lib/api-request";
import { User } from "./types";

// find me
export const findMeApi = (token: string) => {
  return apiRequest("/User/GetUserInfoByToken", {
    method: "GET",
    forceToken: token,
  });
};

// update profile
type UpdateProfileBody = {
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
  avatar: string | null;
  refreeFile: string | null;
  coachFile: string | null;
};

export const updateProfileApi = async (data: UpdateProfileBody) => {
  const res = apiRequest<User>("/User/CompleteProfile", {
    method: "POST",
    body: {
      ...data,
      isMobileVerified: true,
      isProfileCompleted: true,
      birthDay: "Test",
      userType: 1,
      email: "",
      password: "",
      avatar: "",
    },
  });

  return res;
};
