import { apiRequest } from "~/lib/api-request";

type PayBody = {
  redirectUrl: string;
  userId: string;
  isTest: boolean;
};

type PayResult = {
  link: string;
};

export const payPlanApi = async (body: PayBody) => {
  const res = await apiRequest<PayResult>("/Payment/RequestPayment", {
    body,
    method: "POST",
  });
  return res;
};

// verify payment
type GetPaymentResultOptions = {
  trans_id: string;
  id_get: string;
  guid: string;
};

type GetPaymentResultReturnShape = {
  success: boolean;
};

export const getPaymentResultApi = async (options: GetPaymentResultOptions) => {
  const res = await apiRequest<GetPaymentResultReturnShape>(
    "/Payment/VerifyPayment",
    {
      params: options,
      method: "GET",
    }
  );
  return res;
};
