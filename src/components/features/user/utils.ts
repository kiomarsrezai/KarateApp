import { roles } from "./config";
import { User } from "./types";

export const getRoleByStartPath = (path: string) => {
  return roles.find((item) => path.startsWith(item.path));
};

export const getRoleByValue = (value: number) => {
  return roles.find((item) => item.value === value);
};

export const getFullName = (user: User | null | undefined) => {
  if (!user) return "";
  return `${user.name} ${user.family}`;
};
