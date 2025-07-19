import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { auth } from "./auth";

const getToken = async () => {
  let user = null;
  if (typeof window === "undefined") {
    const session = await auth();
    user = session?.user;
  } else {
    const session = await getSession();
    user = session?.user;
  }

  return user?.token;
};

type ErrorShape = {
  statusCode: number;
  message: string | string[];
  error: string;
};

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  formData?: FormData;
  forceToken?: string;
  onUploadProgress?: (percent: number) => void; //
};

export const apiRequest = async <T>(
  url: string,
  options: Options = {}
): Promise<T> => {
  const method = options.method ?? "GET";
  const token = options.forceToken ?? (await getToken());
  const formattedUrl = process.env.NEXT_PUBLIC_API_URL + url;

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!options.formData) headers["Content-Type"] = "application/json";

  const axiosOptions: AxiosRequestConfig = {
    method,
    url: formattedUrl,
    headers,
    data: options.formData || options.body,
    timeout: 60_000,
    onUploadProgress: options.onUploadProgress
      ? (event) => {
          const percent = Math.round((event.loaded / (event.total ?? 1)) * 100);
          options.onUploadProgress?.(percent);
        }
      : undefined,
  };

  try {
    const response: AxiosResponse<T> = await axios(axiosOptions);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMsg = "Unexpected error";

    if (error.response?.data) {
      const errData = error.response.data as ErrorShape;
      errorMsg = Array.isArray(errData.message)
        ? errData.message[0]
        : errData.message;
    } else if (error.message) {
      errorMsg = error.message;
    }

    if (typeof window !== "undefined") {
      toast.error(errorMsg);
    }

    throw new Error(errorMsg);
  }
};
