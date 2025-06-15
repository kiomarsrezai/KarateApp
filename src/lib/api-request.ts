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

  if (!user) return undefined;

  return user.token;
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
};

export const apiRequest = async <T>(
  url: string,
  options: Options = {}
): Promise<T> => {
  const method = options.method ?? "GET";
  const body = options.body ?? null;
  const formData = options.formData ?? null;
  const token = options.forceToken ?? (await getToken());
  const formattedUrl = process.env.NEXT_PUBLIC_API_URL + url;

  const headers: HeadersInit = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  // Only set Content-Type if not using FormData
  if (!formData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(formattedUrl, {
    method,
    body: formData || (body ? JSON.stringify(body) : undefined),
    headers,
  });

  if (!response.ok) {
    let errorMsg = "Unexpected error";
    try {
      const contentType = response.headers.get("Content-Type") ?? "";
      if (contentType.includes("application/json")) {
        const error: ErrorShape = await response.json();
        errorMsg = Array.isArray(error.message)
          ? error.message[0]
          : error.message;
      } else {
        const text = await response.text();
        console.warn("Non-JSON error response:", text);
        errorMsg = `Unexpected response: ${response.status}`;
      }
    } catch {
      errorMsg = response.statusText;
    }

    if (typeof window !== "undefined") {
      toast.error(errorMsg);
    }
    throw new Error(errorMsg);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const data: T = await response.json();
      return data;
    } catch {
      // const raw = await response.text();
      // console.warn("Failed to parse JSON. Raw response:", raw);
      // throw new Error("Failed to parse response as JSON.");
      return null as T;
    }
  } else {
    // const text = await response.text();
    // console.warn("Expected JSON but got:", text);
    // throw new Error("Expected JSON but received non-JSON content.");
    return null as T;
  }
};
