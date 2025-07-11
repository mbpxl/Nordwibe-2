/*
!Логика данной компоненты следующая:
- Компонента отображает верхнюю часть* стриницы на таких страницах как /quiz /chat /search /profile /filter /settings /edit etc...
- В зависимости от текущего URL компонента отображает, либо вообще не отображает кнопки
- верхняя часть* - это заголовок текущей страницы (чат, квизы итд), а также кнопки по бокам от заголовка
*/

import { useLocation } from "react-router-dom";
import burger from "/icons/burger-stair.svg";
import funnel from "/icons/funnel.svg";
import { GoBackButton } from "../GoBackButton/GoBackButton";

interface HeaderProps {
  title: string;
  imgSrc?: string;
}

const Header: React.FC<HeaderProps> = ({ title, imgSrc }) => {
  const location = useLocation();
  const path = location.pathname;

  // назад или бургер
  const renderLeft = () => {
    if (path.startsWith("/profile/")) {
      return <GoBackButton />;
    }
    if (path !== "/chat") {
      return <img src={burger} alt="menu" />;
    }
    return null;
  };

  // в зависимости от страницы
  const renderRight = () => {
    if (path === "/UserProfilePage") {
      return <img src={imgSrc} alt="user actions" />;
    }
    if (path === "/search") {
      return <img src={funnel} alt="search filter" />;
    }
    return <img src={imgSrc} alt="actions" />;
  };

  return (
    <div className="border-b-2 border-[#d9d9d9] px-3.5 py-3 mb-3">
      <div className="flex justify-between items-center text-[1.25rem] leading-6 font-semibold">
        <div>{path != "/quiz" ? renderLeft() : ""}</div>
        <div>
          <h1 className="text-black-heading">{title}</h1>
        </div>
        <div>{path != "/quiz" ? renderRight() : ""}</div>
      </div>
    </div>
  );
};

export default Header;
