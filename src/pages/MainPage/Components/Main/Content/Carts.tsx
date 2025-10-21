//* компонента для карточек "поиск людей", "чаты", "квизы", "профиль" на главной странице

import { Link } from "react-router-dom";
import type { MainPageCartsTypes } from "../../../types/MainPageCartsTypes";
//todo import { useQuizProgress } from "../../../hooks/useQuizProgress";
//todo import Loading from "../../../../../shared/Components/Loading/Loading";
//todo import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";
//todo import { useGetCountCompletedTests } from "../../../hooks/useGetCountCompletedTests";
//todo import { useRanking } from "../../../../SearchPage/service/useRanking";
//todo import { useProfileCompletion } from "../../../hooks/useProfileCompletion";

const Carts = () => {
  //todo const { completionPercentage, isLoading: isProfileCompletionLoading } =
  //   useProfileCompletion();

  // const {
  //   data: rankingData,
  //   isLoading: isRankingLoading,
  //   isError: isRankingError,
  // } = useRanking();

  // const { isLoading, isError, completedQuizzesCount, totalQuizzes } =
  //   useQuizProgress();

  // const {
  //   isLoading: isTestsLoading,
  //   isError: isTestsError,
  //   completedTestsCount,
  //   totalTests,
  // } = useGetCountCompletedTests();

  // if (
  //   isLoading ||
  //   isTestsLoading ||
  //   isRankingLoading ||
  //   isProfileCompletionLoading
  // )
  //   return <Loading />;
  //todo if (isError || isTestsError || isRankingError) return <Error />;

  const carts: MainPageCartsTypes[] = [
    {
      id: "1",
      headind: "Поиск людей",
      //todo: message: `${rankingData?.length} человек`,
      message: `13 человек`,
      bg_image: "/icons/TapBar_MainPage/TapBar-search.svg",
      to: "/search",
    },
    {
      id: "2",
      headind: "Тесты",
      //todo message: `${completedTestsCount}/${totalTests} пройденных`,
      message: `0 пройденных`,
      bg_image: "/icons/TapBar_MainPage/TapBar-tests.svg",
      to: "/test",
    },
    {
      id: "3",
      headind: "Квизы",
      //todo message: `${completedQuizzesCount}/${totalQuizzes} пройденных`,
      message: `0/3 пройденных`,
      bg_image: "/icons/TapBar_MainPage/TapBar-quiz.svg",
      to: "/quiz",
    },
    {
      id: "4",
      headind: "Профиль",
      //todo message: `Заполнен на ${completionPercentage} %`,
      message: `Заполнен на 100%`,
      bg_image: "/icons/TapBar_MainPage/TapBar-profile.svg",
      to: "/profile",
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 mx-auto">
        {carts.map((cart) => (
          <Link key={cart.id} to={cart.to}>
            <div
              className={`min-[443px]: relative z-30 overflow-hidden bg-white rounded-[12px] p-4`}
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
              <button className="mt-[2.7rem] min-[442px]:mt-[3.7rem] min-[486px]:mt-[5.7rem] min-[540px]:mt-[6.9rem] text-white bg-purple-main w-full py-1 rounded-[12px]">
                Перейти
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Carts;
