import { useGetSolarSystemBodies } from "./queries/solar-system-bodies/hooks/use-get-solar-system-bodie";

const App = () => {
  const { data } = useGetSolarSystemBodies({
    order: "englishName",
    limit: 20,
  });
  console.log({ data });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default App;
