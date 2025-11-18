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

const NavBar = () => {
  const location = useLocation();
  const hasUnreadMessages = useHasUnreadMessages();
  const menuItems = [
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

  const isActive = (path: any) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 w-full z-30">
      <div className="bg-white px-2">
        <ul className="flex justify-center gap-[2.5rem] pt-[0.531rem] pb-[1.094rem] text-[#A0A0A0]">
          {menuItems.map((item) => {
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
                    className={`transition delay-50 text-[0.5rem] leading-2 font-bold ${
                      active ? "text-purple-main" : "text-[#A0A0A0]"
                    }`}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
