//* компонента для карточек "поиск людей", "чаты", "квизы", "профиль" на главной странице

import { Link } from "react-router-dom";
import type { MainPageCartsTypes } from "../../../types/MainPageCartsTypes";
import { useQuizProgress } from "../../../hooks/useQuizProgress";
import Loading from "../../../../../shared/Components/Loading/Loading";
import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";
import { useGetCountCompletedTests } from "../../../hooks/useGetCountCompletedTests";
import { useRanking } from "../../../../SearchPage/service/useRanking";
import { useProfileCompletion } from "../../../hooks/useProfileCompletion";

const Carts = () => {
  const { completionPercentage, isLoading: isProfileCompletionLoading } =
    useProfileCompletion();

  const {
    data: rankingData,
    isLoading: isRankingLoading,
    isError: isRankingError,
  } = useRanking();

  const { isLoading, isError, completedQuizzesCount, totalQuizzes } =
    useQuizProgress();

  const {
    isLoading: isTestsLoading,
    isError: isTestsError,
    completedTestsCount,
    totalTests,
  } = useGetCountCompletedTests();

  if (
    isLoading ||
    isTestsLoading ||
    isRankingLoading ||
    isProfileCompletionLoading
  )
    return <Loading />;
  if (isError || isTestsError || isRankingError) return <Error />;

  const carts: MainPageCartsTypes[] = [
    {
      id: "1",
      headind: "Поиск людей",
      message: `${rankingData?.length} человек`,
      bg_image: "/icons/TapBar_MainPage/TapBar-search.svg",
      to: "/search",
    },
    {
      id: "2",
      headind: "Тесты",
      message: `${completedTestsCount}/${totalTests} пройденных`,
      bg_image: "/icons/TapBar_MainPage/TapBar-tests.svg",
      to: "/test",
    },
    {
      id: "3",
      headind: "Квизы",
      message: `${completedQuizzesCount}/${totalQuizzes} пройденных`,
      bg_image: "/icons/TapBar_MainPage/TapBar-quiz.svg",
      to: "/quiz",
    },
    {
      id: "4",
      headind: "Профиль",
      message: `Заполнен на ${completionPercentage} %`,
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
