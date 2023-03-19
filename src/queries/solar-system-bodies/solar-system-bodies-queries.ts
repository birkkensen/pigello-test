import { Bodies } from "./types";
import qs from "query-string";

export type Params = {
  order: string;
  direction?: "asc" | "desc";
  limit: number;
};

export const getSolarSystemBodies = async ({
  limit,
  order,
  direction = "asc",
}: Params): Promise<Bodies> => {
  const query = qs.stringify(
    {
      order: [order, direction],
      page: [1, limit],
    },
    {
      arrayFormat: "comma",
      skipEmptyString: true,
    },
  );
  const res = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies?${query}`,
  );
  return await res.json();
};
