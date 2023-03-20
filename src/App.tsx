import { useState } from "react";
import { SolarSystemBodies } from "./components/solar-system-bodies";
import { bodyTypes, sortBy } from "./utils";

const App = () => {
  const [query, setQuery] = useState({
    order: "",
    filter: "",
  });

  return (
    <div className="p-16">
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
      </div>

      <div className="pt-4">
        <SolarSystemBodies query={query} />
      </div>
    </div>
  );
};

export default App;
