import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { getClient } from "./queryClient";
import { routes } from "./routes"; // or use Vite's alias to simplify import path for nested components
import { ReactQueryDevtools } from "react-query/devtools";
import Gnb from "./compnents/gnb";

const App = () => {
  const element = useRoutes(routes);
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Gnb />
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
