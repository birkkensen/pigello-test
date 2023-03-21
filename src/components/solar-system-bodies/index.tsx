import { useState } from "react";
import { QueryParams } from "../../App";
import { useGetSolarSystemBodies } from "../../queries/solar-system-bodies/hooks/use-get-solar-system-bodie";
import { AddNewBody } from "../add-new-body";
import { Loader } from "../loader";

interface Props {
  query: QueryParams;
}

export const SolarSystemBodies: React.FC<Props> = ({ query }) => {
  const { data, isInitialLoading, isError } = useGetSolarSystemBodies({
    ...query,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const [count, setCount] = useState<number>(0);

  if (isInitialLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
          Bodies in our solar system
          <p className="mt-1 text-sm font-normal text-gray-400">
            Browse between different types of bodies in our solar system.
          </p>
          <p className="mt-1 text-sm font-normal text-gray-400">
            Custom bodies: {count}
          </p>
          <AddNewBody query={query} setCount={setCount} />
        </caption>
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th className="px-6 py-3">Body name</th>
            <th className="px-6 py-3">Around Planet</th>
            <th className="px-6 py-3">Body type</th>
            <th className="px-6 py-3">Density</th>
            <th className="px-6 py-3">Average temp</th>
            <th className="px-6 py-3">Gravity</th>
            <th className="px-6 py-3">Number of moons</th>
          </tr>
        </thead>
        <tbody>
          {data?.bodies?.map((body) => (
            <tr key={body?.id} className="bg-gray-800 border-gray-700">
              <th className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {body?.name}
              </th>
              <td className="px-6 py-4 capitalize">
                {body?.aroundPlanet?.planet || "-"}
              </td>
              <td className="px-6 py-4">{body?.bodyType}</td>
              <td className="px-6 py-4">{body?.density} g.cm3</td>
              <td className="px-6 py-4">{body?.avgTemp} K</td>
              <td className="px-6 py-4">{body?.gravity} m.s-2</td>
              <td className="px-6 py-4">{body?.moons?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
