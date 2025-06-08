import { roles } from "./config";

export const getRoleByStartPath = (path: string) => {
  return roles.find((item) => path.startsWith(item.path));
};

export const getRoleByValue = (value: number) => {
  return roles.find((item) => item.value === value);
};
