import { apiRequest } from "~/lib/api-request";
import { City, Province } from "./types";

export const getProvincesApi = async () => {
  const res = await apiRequest<Province[]>("/Locations/provinces", {
    method: "GET",
  });
  return res;
};

export const getCitiesByProvinceId = async (provinceId: number) => {
  const res = await apiRequest<City[]>(
    `/Locations/provinces/${provinceId}/cities`,
    {
      method: "GET",
    }
  );
  return res;
};
