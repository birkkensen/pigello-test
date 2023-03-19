import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSolarSystemBodies, Params } from "../solar-system-bodies-queries";
import { Bodies } from "../types";

type HookProps = UseQueryOptions<
  Bodies,
  unknown,
  Bodies,
  (string | number | undefined)[]
> &
  Params;

const solarSystemBodiesKey = "solar-system-bodies-key";

export const useGetSolarSystemBodies = (options: HookProps) =>
  useQuery({
    queryKey: [
      solarSystemBodiesKey,
      options?.limit,
      options.order,
      options?.direction,
    ],
    queryFn: () =>
      getSolarSystemBodies({
        limit: options?.limit,
        order: options.order,
        direction: options?.direction,
      }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
