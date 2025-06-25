// компонента для карточек "поиск людей", "чаты", "квизы", "профиль" на главной странице

import type { MainPageCartsTypes } from "../../../types/MainPageCartsTypes";

const carts: MainPageCartsTypes[] = [
  {
    id: "1",
    headind: "Поиск людей",
    message: "680 человек",
    bg_image: "/icons/searchUsers.svg",
  },
  {
    id: "2",
    headind: "Чаты",
    message: "2 сообщения",
    bg_image: "/icons/chat.svg",
  },
  {
    id: "3",
    headind: "Квизы",
    message: "1/8 пройденных",
    bg_image: "/icons/quiz.svg",
  },
  {
    id: "4",
    headind: "Профиль",
    message: "Заолнен на 70%",
    bg_image: "/icons/home.svg",
  },
];

const Carts = () => {
  return (
    <div className="grid grid-cols-2 gap-2 mx-auto mb-[70px] -z-10">
      {carts.map((cart) => (
        <div
          key={cart.id}
          className={`relative z-30 overflow-hidden bg-[#D9D9D9] rounded-[12px] p-4`}
        >
          <img
            src={cart.bg_image}
            alt="img"
            className="absolute -z-10 w-[100px] h-[100px] right-[-20px]"
          />
          <h2 className="text-[1rem] leading-4 font-bold">{cart.headind}</h2>
          <h3 className="mt-[0.5rem] text-[0.75rem] font-semibold leading-3">
            {cart.message}
          </h3>
          <button className="mt-[2.7rem] bg-amber-500 w-full py-1 rounded-[12px]">
            Перейти
          </button>
        </div>
      ))}
    </div>
  );
};

export default Carts;
