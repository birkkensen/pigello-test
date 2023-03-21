import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { QueryParams } from "../../App";
import { solarSystemBodiesKey } from "../../queries/solar-system-bodies/hooks/use-get-solar-system-bodie";
import { Bodies } from "../../queries/solar-system-bodies/types";

type FormData = {
  name: string;
  bodyType: string;
};
interface Props {
  query: QueryParams;
  setCount: Dispatch<SetStateAction<number>>;
}

const mockData = {
  aroundPlanet: {
    planet: "Some",
    rel: "",
  },
  moons: [],
  density: 0,
  gravity: 1,
  avgTemp: 10,
  meanRadius: 100,
};

export const AddNewBody: React.FC<Props> = ({ query, setCount }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      bodyType: "",
    },
  });
  const onSubmit = (data: FormData) => {
    queryClient.setQueryData<Bodies>(
      [solarSystemBodiesKey, ...Object.values(query)],
      (prev) => {
        prev?.bodies.splice(0, 0, {
          name: data.name,
          bodyType: data.bodyType,
          id: crypto.randomUUID(),
          ...mockData,
        });
        return prev;
      },
    );
    reset();
    setCount((prev) => prev + 1);
  };

  return (
    <form
      className="flex items-center gap-4 my-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          className='mb-2 text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
          placeholder="Name"
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <p className="text-xs">This field is required!</p>}
      </div>
      <div>
        <input
          className="mb-2 text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Body type"
          {...register("bodyType", {
            required: true,
          })}
        />
        {errors.bodyType && <p className="text-xs">This field is required!</p>}
      </div>
      <button
        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="submit"
      >
        Add new body
      </button>
    </form>
  );
};
