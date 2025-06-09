import { apiRequest } from "~/lib/api-request";

type Body = {
  amount: number;
  redirectUrl: string;
  factorNumber: string;
  name: string;
  description: string;
  mobile: string;
  email: string;
};

type Result = {
  id: number;
};

export const payPlanApi = async (body: Body) => {
  const res = await apiRequest<Result>("/Payment/RequestPayment", {
    body,
    method: "POST",
  });
  return res;
};
