import { apiRequest } from "~/lib/api-request";
import { GallerySlide } from "./types";

export const getGallerySlidesApi = async () => {
  const res = await apiRequest<GallerySlide[]>("/Gallery/GetGallery", {
    method: "GET",
  });
  return res;
};
