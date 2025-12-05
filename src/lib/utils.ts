import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFilePathWithDefault = (
  filename: string | null,
  defaultImage?: string
) => {
  const rawName = (filename || "").trim();

  // اگر خالی، "." یا "/" بود، یعنی مسیر معتبر نیست → عکس پیش‌فرض
  if (!rawName || rawName === "." || rawName === "/") {
    return defaultImage || "/img/default.jpg";
  }

  let base = (process.env.NEXT_PUBLIC_FILE_URL || "").replace(/\/+$/, "");

  // تبدیل http به https برای سرورهای غیر localhost
  if (
    base.startsWith("http://") &&
    !base.includes("localhost") &&
    !base.includes("127.0.0.1")
  ) {
    base = "https://" + base.substring("http://".length);
  }

  const cleanName = rawName.startsWith("/") ? rawName : `/${rawName}`;

  return `${base}${cleanName}`;
};