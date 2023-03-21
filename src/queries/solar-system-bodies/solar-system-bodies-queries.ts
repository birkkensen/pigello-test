import { Bodies } from "./types";
import qs from "query-string";

export type Params = {
  order: string;
  filter: string;
  direction: "asc" | "desc";
};

export const getSolarSystemBodies = async ({
  order,
  filter,
  direction,
}: Params): Promise<Bodies> => {
  const query = qs.stringify(
    {
      order: [order, direction],
      filter: filter && ["bodyType", "eq", filter],
      data: [
        "name",
        "aroundPlanet",
        "bodyType",
        "density",
        "avgTemp",
        "gravity",
        "mooons",
        "id",
      ],
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
