import { createLoader, parseAsString } from "nuqs/server";

export const filterSearchParams = {
  filter: parseAsString.withDefault("board"),
};

export const loadSearchParams = createLoader(filterSearchParams);
