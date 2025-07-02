import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { Suspense } from "react";
import Loading from "./Loading/Loading";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          Component={() => (
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          )}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
