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
  onUploadProgress?: (percent: number) => void;
  params?: Record<string, string>;
};

/**
 * ساخت امن URL برای API:
 *  - اضافه کردن / بین base و path
 *  - تبدیل http به https برای دامنه‌های غیر localhost
 */
const buildApiUrl = (path: string): string => {
  const rawBase = process.env.NEXT_PUBLIC_API_URL || "";

  if (!rawBase) {
    throw new Error(
      "API URL is not configured. Please set NEXT_PUBLIC_API_URL environment variable."
    );
  }

  // حذف / های انتهای base
  let base = rawBase.replace(/\/+$/, "");

  // تبدیل http به https برای سرورهای واقعی
  if (
    base.startsWith("http://") &&
    !base.includes("localhost") &&
    !base.includes("127.0.0.1")
  ) {
    base = "https://" + base.substring("http://".length);
  }

  // اطمینان از اینکه path با / شروع می‌شود
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${cleanPath}`;
};

export const apiRequest = async <T>(
  url: string,
  options: Options = {}
): Promise<T> => {
  const method = options.method ?? "GET";
  const token = options.forceToken ?? (await getToken());

  const formattedUrl = buildApiUrl(url);

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!options.formData) headers["Content-Type"] = "application/json";

  const axiosOptions: AxiosRequestConfig = {
    method,
    url: formattedUrl,
    params: options.params,
    headers,
    data: options.formData || options.body,
    timeout: 60_000,
    onUploadProgress: options.onUploadProgress
      ? (event) => {
          const percent = Math.round(
            (event.loaded / (event.total ?? 1)) * 100
          );
          options.onUploadProgress?.(percent);
        }
      : undefined,
  };

  try {
    const response: AxiosResponse<T> = await axios(axiosOptions);
    return response.data;
  } 
  catch (error: any) {
    let errorMsg = "Unexpected error";

    // خطای Mixed Content یا بلاک شدن
    if (
      error.code === "ERR_BLOCKED_BY_CLIENT" ||
      error.message?.includes("Mixed Content")
    ) {
      errorMsg = "خطا در اتصال به سرور. لطفاً از HTTPS استفاده کنید.";
    } else if (error.response?.status === 502) {
      errorMsg = "سرور در دسترس نیست. لطفاً بعداً تلاش کنید.";
    } else if (error.response?.data) {
      const errData = error.response.data as ErrorShape;
      errorMsg = Array.isArray(errData.message)
        ? errData.message[0]
        : errData.message;
    } 
    else if (error.message) {
      errorMsg = error.message;
    }
    
    if (typeof window !== "undefined") {
      toast.error(errorMsg);
    }

    throw new Error(errorMsg);
  }
};
