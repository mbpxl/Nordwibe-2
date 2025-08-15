import searchUsersIcon from "/icons/searchUsers.svg";
import chatIcon from "/icons/chat.svg";
import homeIcon from "/icons/home.svg";
import quizIcon from "/icons/quiz.svg";
import profileIcon from "/icons/profile.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed bottom-0 w-full z-30">
      <div className="bg-white px-2">
        <ul className="flex justify-center gap-[2.5rem] pt-[0.531rem] pb-[1.094rem] text-[#A0A0A0]">
          <li className="flex flex-col items-center justify-center gap-0.5">
            <Link
              className="flex flex-col items-center justify-center gap-0.5"
              to={"/search"}
            >
              <img
                src={searchUsersIcon}
                alt="icon"
                className="min-w-6 min-h-6 shrink-0"
              />
              <p className="text-[0.5rem] leading-2 font-bold">Поиск</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col items-center justify-center gap-0.5"
              to={"/chat"}
            >
              <img
                src={chatIcon}
                alt="icon"
                className="min-w-6 min-h-6 shrink-0"
              />
              <p className="text-[0.5rem] leading-2 font-bold">Чат</p>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex flex-col items-center justify-center gap-0.5"
              to={"/"}
            >
              <img
                src={homeIcon}
                alt="icon"
                className="min-w-6 min-h-6 shrink-0"
              />
              <p className="text-[0.5rem] leading-2 font-bold">Главная</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center gap-0.5">
            <Link
              className="flex flex-col items-center justify-center gap-0.5"
              to={"/quiz"}
            >
              <img
                src={quizIcon}
                alt="icon"
                className="min-w-6 min-h-6 shrink-0"
              />
              <p className="text-[0.5rem] leading-2 font-bold">Квизы</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center gap-0.5">
            <Link
              className="flex flex-col items-center justify-center gap-0.5"
              to={"/profile"}
            >
              <img
                src={profileIcon}
                alt="icon"
                className="min-w-6 min-h-6 shrink-0"
              />
              <p className="text-[0.5rem] leading-2 font-bold">Профиль</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
