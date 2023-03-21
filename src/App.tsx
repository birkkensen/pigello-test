import { useState } from "react";
import { SolarSystemBodies } from "./components/solar-system-bodies";
import { FitlerBar } from "./components/filter-bar";

export type QueryParams = {
  order: string;
  filter: string;
  direction: "asc" | "desc";
};

const App = () => {
  const [query, setQuery] = useState<QueryParams>({
    order: "",
    filter: "",
    direction: "asc",
  });

  return (
    <div className="p-16">
      <FitlerBar query={query} setQuery={setQuery} />
      <div className="pt-4">
        <SolarSystemBodies query={query} />
      </div>
    </div>
  );
};

export default App;
