import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} Component={Component} />
      ))}
    </Routes>
  );
};

export default AppRouter;
