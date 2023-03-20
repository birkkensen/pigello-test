import { useGetSolarSystemBodies } from "../../queries/solar-system-bodies/hooks/use-get-solar-system-bodie";
import { Loader } from "../loader";

interface Props {
  query: {
    order: string;
    filter: string;
  };
}

export const SolarSystemBodies: React.FC<Props> = ({ query }) => {
  const { data, isInitialLoading, isError } = useGetSolarSystemBodies({
    ...query,
  });

  if (isInitialLoading)
    return (
      <div className="flex justify-center">
        <Loader />;
      </div>
    );

  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="flex flex-wrap gap-4 self-start">
      {data?.bodies.map((body) => (
        <div
          key={body.id}
          className="block w-full p-6 rounded-lg shadow bg-gray-800 border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {body.name}
          </h5>
          <p className="font-normal text-gray-400">
            Around planet: {body?.aroundPlanet?.planet ?? "-"}
          </p>
          <p className="font-normal text-gray-400">
            Body type: {body?.bodyType}
          </p>
        </div>
      ))}
    </div>
  );
};
