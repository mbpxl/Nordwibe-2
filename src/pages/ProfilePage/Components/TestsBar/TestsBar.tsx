import type { TestType } from "../../../TestPage/types/testDataTypes";
import TestsItem from "./TestsItem";
import TestsItemDesktop from "./TestsItemDesktop";

type TestsBarProps = {
  tests?: TestType[];
  userTests?: Array<{
    uuid: string;
    title: string;
    description: string;
    image_url: string;
    is_important: boolean;
    isCompleted: boolean;
  }>;
  gender?: "Женский" | "Мужской";
  isMyProfile?: boolean;
  userName?: string | null;
  onEdit?: () => void;
  onResultClick?: (testId: string) => void;
};

const TestsBar: React.FC<TestsBarProps> = ({
  tests,
  userTests,
  isMyProfile = false,
  userName = null,
  onEdit,
  gender,
  onResultClick,
}) => {
  const displayName = gender == null ? "Пользователь" : userName;

  const testsToShow = userTests
    ? userTests.map((test) => ({
        ...test,
        uuid: test.uuid,
        title: test.title,
        description: test.description,
        image_url: test.image_url,
        is_important: test.is_important,
        isCompleted: test.isCompleted,
      }))
    : tests || [];
  const hasTests = testsToShow.length > 0;

  const completedTestsCount = userTests
    ? userTests.filter((t) => t.isCompleted).length
    : tests
    ? tests.length
    : 0;

  // Создаем массив элементов для десктопной версии (всегда 6 элементов)
  const desktopItems = [];
  const maxDesktopItems = 6;

  // Добавляем реальные тесты
  for (let i = 0; i < Math.min(testsToShow.length, maxDesktopItems); i++) {
    desktopItems.push({
      type: "test" as const,
      test: testsToShow[i],
      isCompleted:
        //@ts-ignore
        "isCompleted" in testsToShow[i] ? testsToShow[i].isCompleted : true,
    });
  }

  // Добавляем заглушки для оставшихся мест
  for (let i = desktopItems.length; i < maxDesktopItems; i++) {
    desktopItems.push({ type: "placeholder" as const });
  }

  // Для мобильной версии - добавляем одну заглушку если есть место
  const mobileItems = [...testsToShow];
  if (mobileItems.length < 4) {
    // Добавляем одну заглушку в конец для мобильной версии
    mobileItems.push({ type: "placeholder" } as any);
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-60"></div>
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
              fill="#8B5CF6"
              fillOpacity="0.6"
            />
            <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="#8B5CF6" />
          </svg>
        </div>

        <h3 className="text-base font-semibold text-gray-700 mb-1">
          Новый тест в разработке
        </h3>

        <p className="text-sm text-gray-500 mb-4">Скоро появится</p>
      </div>

      <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
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
          <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="#9CA3AF" />
        </svg>
      </div>

      <h3 className="text-sm font-medium text-gray-600 mb-1">Новый тест</h3>

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

  if (!hasTests) {
    return (
      <div className="mt-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[0.875rem] font-semibold text-black-heading leading-3">
            Тесты
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
                ? "Пройдите тесты, чтобы повысить шансы найти идеального соседа"
                : `${displayName} ещё не прош${
                    gender == "Женский" ? "ла" : "ёл"
                  } тесты`}
            </span>
          </div>

          {isMyProfile && onEdit && (
            <button
              onClick={onEdit}
              className="mt-3 text-purple-main hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Пройти тесты
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
            Тесты
          </h2>

          {!isMyProfile && userTests && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {completedTestsCount}/{userTests.length} пройдено
            </span>
          )}
          {isMyProfile && userTests && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {completedTestsCount}/{userTests.length} пройдено
            </span>
          )}
        </div>
      </div>

      {/* MOBILE — горизонтальный скролл */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide xl:hidden">
        {mobileItems.map((item, index) => {
  if ("uuid" in item) {
    return (
      <TestsItem
        key={item.uuid}
        isMyProfile={isMyProfile}
        test={item}
        isCompleted={"isCompleted" in item ? item.isCompleted : true}
        onResultClick={(isMyProfile || (!isMyProfile && item.isCompleted)) && onResultClick 
          ? () => onResultClick(item.uuid) 
          : undefined
        }
      />
            );
          } else {
            // Это заглушка
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
  if (item.type === "test") {
    return (
      <TestsItemDesktop
        key={item.test.uuid}
        test={item.test}
        isMyProfile={isMyProfile}
        isCompleted={item.isCompleted}
        onResultClick={(isMyProfile || (!isMyProfile && item.isCompleted)) && onResultClick
          ? () => onResultClick(item.test.uuid)
          : undefined
        }
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

export default TestsBar;
