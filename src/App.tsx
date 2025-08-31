import { BrowserRouter, matchPath, useLocation } from "react-router-dom";
import AppRouter from "./shared/Components/AppRouter";
import NavBar from "./shared/Components/NavBar/NavBar";
import { hideNavBarRoutes } from "./shared/utils/consts";

function AppContent() {
  const location = useLocation();
  const shouldHideNavBar =
    hideNavBarRoutes.includes(location.pathname) ||
    !!matchPath("/quiz/:uuid", location.pathname) ||
    matchPath("/quiz/test/:uuid", location.pathname) ||
    matchPath("/test/:uuid", location.pathname) ||
    matchPath("/profile/:ids", location.pathname);

  return (
    <>
      <AppRouter />
      {!shouldHideNavBar && <NavBar />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
