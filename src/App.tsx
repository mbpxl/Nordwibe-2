import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { hideNavBarRoutes } from "./utils/consts";

function AppContent() {
  const location = useLocation();
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

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
