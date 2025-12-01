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
    <div className="w-full lg:w-[696px] mx-auto max-lg:mb-20">
      <div
        className="
      grid grid-cols-2 gap-2 lg:gap-x-4 lg:gap-y-4
      auto-rows-min
      place-items-stretch
    "
      >
        {carts.map((cart) => (
          <Link key={cart.id} to={cart.to}>
            <div
              className="
            relative overflow-hidden bg-white rounded-[12px] p-4
            shadow-sm hover:shadow-md transition-shadow
            min-h-[140px] lg:min-h-[168px]
          "
            >
              <img
                src={cart.bg_image}
                alt="img"
                className="
              absolute top-2 right-[-12px] w-[100px] h-[100px] opacity-90 z-0 pointer-events-none
              lg:w-[130px] lg:h-[130px] lg:right-[-8px]
            "
              />

              <div className="relative z-10">
                <h2 className="text-[1rem] text-black-heading leading-4 font-bold lg:text-[1.25rem]">
                  {cart.headind}
                </h2>

                <h3 className="mt-[0.5rem] text-black-heading text-[0.75rem] font-semibold lg:text-[0.9rem]">
                  {cart.message}
                </h3>

                <button
                  className="
                mt-[2.7rem] min-[442px]:mt-[3.7rem] min-[486px]:mt-[5.7rem] min-[540px]:mt-[6.9rem]
                text-white bg-purple-main w-full py-1 rounded-[12px] lg:hidden
              "
                >
                  Перейти
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Carts;
