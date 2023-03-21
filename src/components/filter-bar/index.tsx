import { Dispatch, SetStateAction } from "react";
import { QueryParams } from "../../App";
import { bodyTypes, sortBy } from "./utils";

interface Props {
  query: QueryParams;
  setQuery: Dispatch<SetStateAction<QueryParams>>;
}

export const FitlerBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-full">
        <label
          htmlFor="bodyType"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Filter bodies by
        </label>
        <select
          name="bodyType"
          className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
          onChange={(e) => setQuery({ ...query, filter: e.target.value })}
        >
          <option disabled value="">
            Filter bodies by
          </option>
          <option value="">All bodies</option>
          {bodyTypes.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          htmlFor="sortBy"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Sort bodies by
        </label>
        <select
          name="sortBy"
          className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
          onChange={(e) => setQuery({ ...query, order: e.target.value })}
        >
          <option disabled value="">
            Sort bodies by
          </option>
          {sortBy.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          htmlFor="direction"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Direction
        </label>
        <select
          name="direction"
          className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          defaultValue={query.direction}
          onChange={(e) =>
            setQuery({
              ...query,
              direction: e.target.value as QueryParams["direction"],
            })
          }
        >
          <option disabled value="">
            Sort by asc or desc
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};
