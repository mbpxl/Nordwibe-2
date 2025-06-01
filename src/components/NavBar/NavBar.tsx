import searchUsersIcon from "../../assets/icons/searchUsers.svg";
import chatIcon from "../../assets/icons/chat.svg";
import homeIcon from "../../assets/icons/home.svg";
import quizIcon from "../../assets/icons/quiz.svg";
import profileIcon from "../../assets/icons/profile.svg";

const NavBar = () => {
  return (
    <nav className="fixed bottom-0 w-full">
      <div className="bg-amber-200 px-2">
        <ul className="flex justify-center gap-[2.5rem] pt-[0.531rem] pb-[1.094rem] text-[#A0A0A0]">
          <li className="flex flex-col items-center justify-center gap-0.5">
            <img
              src={searchUsersIcon}
              alt="icon"
              className="min-w-6 min-h-6 shrink-0"
            />
            <p className="text-[0.5rem] leading-2 font-bold">Поиск</p>
          </li>
          <li className="flex flex-col items-center justify-center gap-0.5">
            <img
              src={chatIcon}
              alt="icon"
              className="min-w-6 min-h-6 shrink-0"
            />
            <p className="text-[0.5rem] leading-2 font-bold">Чат</p>
          </li>
          <li className="flex flex-col items-center justify-center gap-0.5">
            <img
              src={homeIcon}
              alt="icon"
              className="min-w-6 min-h-6 shrink-0"
            />
            <p className="text-[0.5rem] leading-2 font-bold">Главная</p>
          </li>
          <li className="flex flex-col items-center justify-center gap-0.5">
            <img
              src={quizIcon}
              alt="icon"
              className="min-w-6 min-h-6 shrink-0"
            />
            <p className="text-[0.5rem] leading-2 font-bold">Квизы</p>
          </li>
          <li className="flex flex-col items-center justify-center gap-0.5">
            <img
              src={profileIcon}
              alt="icon"
              className="min-w-6 min-h-6 shrink-0"
            />
            <p className="text-[0.5rem] leading-2 font-bold">Профиль</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
