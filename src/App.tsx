import { BrowserRouter, Link, useLocation } from "react-router-dom";
import AppRouter from "./shared/Components/AppRouter";
import NavBar from "./shared/Components/NavBar/NavBar";
import { hideNavBarRoutes } from "./shared/utils/consts";
import CookieConsent from "react-cookie-consent";
import { Toaster } from "react-hot-toast";
import { useIsDesktop } from "./shared/hooks/useIsDesktop";

function AppContent() {
  const isDesktop = useIsDesktop();
  const location = useLocation();

  const shouldHideNavBar =
    hideNavBarRoutes.includes(location.pathname) ||
    (!isDesktop &&
      [
        "/quiz/",
        "/settings",
        "/profile/",
        "/quiz/test",
        "/test/",
        "/chats",
      ].some((path) => location.pathname.startsWith(path)));

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
      <CookieConsent
        expires={365}
        location="bottom"
        style={{
          background: "#a1a0ff",
          textAlign: "left",
          color: "#1a1a1a",
        }}
        buttonStyle={{
          background: "#fff",
          color: "#000",
          fontSize: "18px",
          borderRadius: "10px",
        }}
        buttonText="Принять"
      >
        Нажимая "Принять", вы соглашаетесь на сохранение файлов cookie на вашем
        устройстве для улучшения навигации по сайту и анализа использования
        сайта. Ознакомьтесь с нашей{" "}
        <Link to="/privacy" style={{ textDecoration: "underline" }}>
          Политикой конфиденциальности
        </Link>{" "}
        для получения дополнительной информации.
      </CookieConsent>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
