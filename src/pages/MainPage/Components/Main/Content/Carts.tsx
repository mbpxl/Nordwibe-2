// компонента для карточек "поиск людей", "чаты", "квизы", "профиль" на главной странице

import type { MainPageCartsTypes } from "../../../types/MainPageCartsTypes";

const carts: MainPageCartsTypes[] = [
  {
    id: "1",
    headind: "Поиск людей",
    message: "680 человек",
    bg_image: "/icons/TapBar_MainPage/TapBar-search.svg",
  },
  {
    id: "2",
    headind: "Тесты",
    message: "3/8 пройденных",
    bg_image: "/icons/TapBar_MainPage/TapBar-tests.svg",
  },
  {
    id: "3",
    headind: "Квизы",
    message: "1/8 пройденных",
    bg_image: "/icons/TapBar_MainPage/TapBar-quiz.svg",
  },
  {
    id: "4",
    headind: "Профиль",
    message: "Заолнен на 70%",
    bg_image: "/icons/TapBar_MainPage/TapBar-profile.svg",
  },
];

const Carts = () => {
  return (
    <div className="grid grid-cols-2 gap-2 mx-auto mb-[70px] -z-10">
      {carts.map((cart) => (
        <div
          key={cart.id}
          className={`relative z-30 overflow-hidden bg-white rounded-[12px] p-4`}
        >
          <img
            src={cart.bg_image}
            alt="img"
            className="absolute -z-10 w-[100px] h-[100px] right-[-20px]"
          />
          <h2 className="text-[1rem] text-black-heading leading-4 font-bold">
            {cart.headind}
          </h2>
          <h3 className="mt-[0.5rem] text-black-heading text-[0.75rem] font-semibold leading-3">
            {cart.message}
          </h3>
          <button className="mt-[2.7rem] text-white bg-purple-main w-full py-1 rounded-[12px]">
            Перейти
          </button>
        </div>
      ))}
    </div>
  );
};

export default Carts;
