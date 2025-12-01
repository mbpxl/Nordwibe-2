import { Link, useLocation } from "react-router-dom";

import searchUsersIcon from "/icons/navbar/searchUsers.svg";
import searchUsersIconActive from "/icons/navbar/searchUsers-active.svg";
import chatIcon from "/icons/navbar/chat.svg";
import chatIconActive from "/icons/navbar/chat-active.svg";
import homeIcon from "/icons/navbar/home.svg";
import homeIconActive from "/icons/navbar/home-active.svg";
import quizIcon from "/icons/navbar/quiz.svg";
import quizIconActive from "/icons/navbar/quiz-active.svg";
import profileIcon from "/icons/navbar/profile.svg";
import profileIconActive from "/icons/navbar/profile-active.svg";

import { useHasUnreadMessages } from "../../../pages/ChatPage/hooks/useHasUnreadMessages";
import { useGetMe } from "../../../pages/ProfilePage/service/useGetMe";
import { baseURLforImages } from "../../plugin/axios";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import Loading from "../Loading/Loading";
import Error from "../ErrorPage/ErrorPage";

const NavBar = () => {
  const { data: myData, isLoading, isError } = useGetMe();

  const location = useLocation();
  const hasUnreadMessages = useHasUnreadMessages();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const mobileMenuItems = [
    {
      path: "/search",
      icon: searchUsersIcon,
      activeIcon: searchUsersIconActive,
      label: "Поиск",
    },
    {
      path: "/chat",
      icon: chatIcon,
      activeIcon: chatIconActive,
      label: "Чат",
      hasNotification: hasUnreadMessages,
    },
    {
      path: "/",
      icon: homeIcon,
      activeIcon: homeIconActive,
      label: "Главная",
    },
    {
      path: "/quiz",
      icon: quizIcon,
      activeIcon: quizIconActive,
      label: "Квизы",
    },
    {
      path: "/profile",
      icon: profileIcon,
      activeIcon: profileIconActive,
      label: "Профиль",
    },
  ];

  const desktopMenuItems = [
    { path: "/", label: "Главная" },
    { path: "/search", label: "Поиск людей" },
    { path: "/chat", label: "Чаты", hasNotification: hasUnreadMessages },
    { path: "/quiz", label: "Квизы" },
  ];

  const isActive = (path: any) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="
        fixed bottom-0 w-full z-30 bg-white
        lg:top-0 lg:bottom-auto
      "
    >
      {/* ================= MOBILE NAVIGATION ================= */}
      <div
        className={`${
          location.pathname == "/settings" ||
          location.pathname.startsWith("/profile/")
            ? "hidden"
            : ""
        } lg:hidden bg-white px-2`}
      >
        <ul className="flex justify-center gap-[2.5rem] pt-[0.531rem] pb-[1.094rem] text-[#A0A0A0]">
          {mobileMenuItems.map((item) => {
            const active = isActive(item.path);

            return (
              <li
                key={item.path}
                className="flex flex-col items-center justify-center gap-0.5"
              >
                <Link
                  className="flex flex-col items-center justify-center gap-0.5 relative"
                  to={item.path}
                >
                  <div className="relative">
                    <img
                      src={active ? item.activeIcon : item.icon}
                      alt={item.label}
                      className="min-w-6 min-h-6 shrink-0"
                    />
                    {item.hasNotification && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                    )}
                  </div>

                  <p
                    className={`
                      transition delay-50 text-[0.5rem] leading-2 font-bold 
                      ${active ? "text-purple-main" : "text-[#A0A0A0]"}
                    `}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ================= DESKTOP NAVIGATION ================= */}
      <div
        className="
          hidden lg:flex items-center justify-between
          mx-auto px-2 max-w-[1340px] h-[60px]
        "
      >
        {/* ЛОГОТИП */}
        <Link to="/" className="text-2xl font-bold text-purple-main w-[164px]">
          <img src="/imgs/desktop/logo.png" alt="" />
        </Link>

        {/* ТЕКСТОВЫЕ РАЗДЕЛЫ */}
        <ul className="flex items-center xl:gap-40 gap-10 text-base font-medium">
          {desktopMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  transition-colors
                  ${
                    isActive(item.path)
                      ? "text-purple-main font-semibold"
                      : "text-gray-500"
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* АВАТАР + НАСТРОЙКИ */}
        <div className="flex items-center gap-5">
          <Link to="/profile">
            {!myData?.avatar_url ? (
              <div className="flex w-[44px] h-[44px] rounded-xl justify-center items-center bg-purple-sub-button text-white font-semibold text-4xl">
                {myData?.username
                  ? myData?.username[0].toUpperCase()
                  : myData?.name?.charAt(0) || "П"}
              </div>
            ) : (
              <OptimizedImage
                className="rounded-xl"
                src={baseURLforImages + myData?.avatar_url}
                alt="avatar"
                width={44}
                height={44}
                quality={50}
                priority={true}
              />
            )}
          </Link>

          <Link to="/settings">
            {location.pathname == "/settings" ? (
              <img
                src="/icons/settings-active.svg"
                className="w-7 h-7"
                alt="settings"
              />
            ) : (
              <img src="/icons/gear.svg" className="w-7 h-7" alt="settings" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
