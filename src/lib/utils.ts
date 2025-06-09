import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFilePathWithDefault = (
  filename: string | null,
  defaultImage?: string
) => {
  if (!filename) return defaultImage || "/img/default.jpg";
  return `${process.env.NEXT_PUBLIC_FILE_URL}${filename}`;
};
