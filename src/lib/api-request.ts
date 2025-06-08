import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { auth } from "./auth";
import { env } from "~/env";

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
  forceToken?: string;
};

export const apiRequest = async <T>(
  url: string,
  options: Options = {}
): Promise<T> => {
  const method = options.method ?? "GET";
  const body = options.body ?? null;
  const token = options.forceToken ?? (await getToken());
  const formatedUrl = env.NEXT_PUBLIC_API_URL + url;

  console.log({ formatedUrl });
  const response = await fetch(formatedUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: ErrorShape = await response.json();
    const errorMsg = Array.isArray(error.message)
      ? error.message[0]
      : error.message;
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }

  const data: T = await response.json();

  return data;
};
