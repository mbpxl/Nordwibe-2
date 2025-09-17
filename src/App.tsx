import { BrowserRouter, matchPath, useLocation } from "react-router-dom";
import AppRouter from "./shared/Components/AppRouter";
import NavBar from "./shared/Components/NavBar/NavBar";
import { hideNavBarRoutes } from "./shared/utils/consts";
import { useEffect } from "react";
import { useLogout } from "./pages/SettingsPage/service/useLogout";

function AppContent() {
  const location = useLocation();
  const shouldHideNavBar =
    hideNavBarRoutes.includes(location.pathname) ||
    !!matchPath("/quiz/:uuid", location.pathname) ||
    matchPath("/quiz/test/:uuid", location.pathname) ||
    matchPath("/test/:uuid", location.pathname) ||
    matchPath("/profile/:ids", location.pathname) ||
    matchPath("/chats/:companiodId", location.pathname);

  return (
    <>
      <AppRouter />
      {!shouldHideNavBar && <NavBar />}
    </>
  );
}

function App() {
  const { mutate: logout } = useLogout();

  // чистим старые куки у старых пользователей
  useEffect(() => {
    const migrated = localStorage.getItem("migration_done");

    if (!migrated) {
      localStorage.clear();
      sessionStorage.clear();

      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

      localStorage.setItem("migration_done", "true");
      logout();
    }
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
