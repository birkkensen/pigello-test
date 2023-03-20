import { Bodies } from "./types";
import qs from "query-string";

export type Params = {
  order: string;
  filter: string;
};

export const getSolarSystemBodies = async ({
  order,
  filter,
}: Params): Promise<Bodies> => {
  const query = qs.stringify(
    {
      order,
      filter: filter && ["bodyType", "eq", filter],
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
