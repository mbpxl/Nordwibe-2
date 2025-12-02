import React from "react";
import QuizItem from "./QuizItem";
import QuizItemDesktop from "./QuizItemDesktop";

type QuizItemType = {
  uuid: string;
  title: string;
  description: string;
  image_url: string;
  duration: number;
  isCompleted: boolean;
};

type QuizzesBarProps = {
  quizzes?: QuizItemType[];
  userQuizzes?: QuizItemType[];
  gender?: "Женский" | "Мужской";
  isMyProfile?: boolean;
  userName?: string | null;
  onEdit?: () => void;
};

const QuizzesBar: React.FC<QuizzesBarProps> = ({
  quizzes,
  userQuizzes,
  isMyProfile = false,
  userName = null,
  onEdit,
  gender,
}) => {
  const displayName = gender == null ? "Пользователь" : userName;

  const quizzesToShow = userQuizzes
    ? userQuizzes.map((quiz) => ({
        ...quiz,
        uuid: quiz.uuid,
        title: quiz.title,
        description: quiz.description,
        image_url: quiz.image_url,
        duration: quiz.duration,
        isCompleted: quiz.isCompleted,
      }))
    : quizzes || [];
  const hasQuizzes = quizzesToShow.length > 0;

  const completedQuizzesCount = userQuizzes
    ? userQuizzes.filter((q) => q.isCompleted).length
    : quizzes
    ? quizzes.length
    : 0;

  // Создаем массивы элементов для обеих версий
  const maxItems = 6;
  const desktopItems = [];
  const mobileItems = [];

  // Добавляем реальные квизы
  for (let i = 0; i < Math.min(quizzesToShow.length, maxItems); i++) {
    const item = {
      type: "quiz" as const,
      quiz: quizzesToShow[i],
      isCompleted: quizzesToShow[i].isCompleted,
    };
    desktopItems.push(item);
    mobileItems.push(item);
  }

  // Добавляем заглушки для оставшихся мест (6 - количество реальных квизов)
  for (let i = desktopItems.length; i < maxItems; i++) {
    desktopItems.push({ type: "placeholder" as const });
    mobileItems.push({ type: "placeholder" as const });
  }

  // Компонент заглушки для десктопной версии
  const PlaceholderItemDesktop = () => (
    <div
      className="
        flex flex-col items-center justify-center
        border border-dashed border-gray-300 rounded-xl
        p-6 text-center
        w-[196px] h-[196px]
        hover:border-gray-400 transition-colors
        bg-gradient-to-br from-gray-50 to-gray-100
      "
    >
      <div className="mb-4">
        <div className="relative w-12 h-12 mx-auto mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-60"></div>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="#3B82F6"
              fillOpacity="0.6"
            />
            <path
              d="M12 17L13.56 13.58L17 13L14 10.15L14.88 7L12 9.12L9.12 7L10 10.15L7 13L10.44 13.58L12 17Z"
              fill="#3B82F6"
            />
          </svg>
        </div>

        <h3 className="text-base font-semibold text-gray-700 mb-1">
          Квиз в разработке
        </h3>

        <p className="text-sm text-gray-500 mb-4">Скоро появится</p>
      </div>

      <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <span className="px-3 py-1 bg-white rounded-full shadow-sm">Скоро</span>
      </div>
    </div>
  );

  // Компонент заглушки для мобильной версии
  const PlaceholderItemMobile = () => (
    <div
      className="
        flex-shrink-0
        flex flex-col items-center justify-center
        border border-dashed border-gray-300 rounded-lg
        p-4 text-center
        min-w-[140px] h-[100px]
        hover:border-gray-400 transition-colors
        bg-gradient-to-br from-gray-50 to-gray-100
      "
    >
      <div className="mb-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="#9CA3AF"
          />
          <path
            d="M12 17L13.56 13.58L17 13L14 10.15L14.88 7L12 9.12L9.12 7L10 10.15L7 13L10.44 13.58L12 17Z"
            fill="#9CA3AF"
          />
        </svg>
      </div>

      <h3 className="text-sm font-medium text-gray-600 mb-1">Новый квиз</h3>

      <p className="text-xs text-gray-500">Скоро</p>

      <div className="mt-3">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></div>
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );

  // Если нет реальных квизов, показываем заглушку
  if (!hasQuizzes) {
    return (
      <div className="mt-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[0.875rem] font-semibold text-black-heading leading-3">
            Квизы
          </h2>
        </div>

        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
          <div className="flex items-center justify-center gap-3 text-gray-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
                fill="currentColor"
              />
              <path
                d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z"
                fill="currentColor"
              />
            </svg>

            <span className="text-sm">
              {isMyProfile
                ? "Пройдите квизы, чтобы узнать больше о себе"
                : `${displayName} ещё не прош${
                    gender == "Женский" ? "ла" : "ёл"
                  } квизы`}
            </span>
          </div>

          {isMyProfile && onEdit && (
            <button
              onClick={onEdit}
              className="mt-3 text-purple-main hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Пройти квизы
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[0.875rem] font-semibold text-black-heading leading-3">
            Квизы
          </h2>

          {!isMyProfile && userQuizzes && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {completedQuizzesCount}/{userQuizzes.length} пройдено
            </span>
          )}
          {isMyProfile && userQuizzes && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {completedQuizzesCount}/{userQuizzes.length} пройдено
            </span>
          )}
        </div>
      </div>

      {/* MOBILE — горизонтальный скролл (всегда 6 элементов) */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide xl:hidden">
        {mobileItems.map((item, index) => {
          if (item.type === "quiz") {
            return (
              <QuizItem
                key={item.quiz.uuid}
                quiz={item.quiz}
                isCompleted={item.isCompleted}
                isMyProfile={isMyProfile}
              />
            );
          } else {
            return (
              <PlaceholderItemMobile key={`placeholder-mobile-${index}`} />
            );
          }
        })}
      </div>

      {/* DESKTOP — сетка 3×2 */}
      <div
        className="
          hidden xl:grid
          grid-cols-3 grid-rows-2
          gap-3
          w-[630px]
        "
      >
        {desktopItems.map((item, index) => {
          if (item.type === "quiz") {
            return (
              <QuizItemDesktop
                key={item.quiz.uuid}
                quiz={item.quiz}
                isCompleted={item.isCompleted}
                isMyProfile={isMyProfile}
              />
            );
          } else {
            return (
              <div key={`placeholder-desktop-${index}`} className="h-full">
                <PlaceholderItemDesktop />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default QuizzesBar;
