import type { TestType } from "../../../TestPage/types/testDataTypes";
import TestsItem from "./TestsItem";

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
  isMyProfile?: boolean;
  userName?: string | null;
  onEdit?: () => void;
};

const TestsBar: React.FC<TestsBarProps> = ({
  tests,
  userTests,
  isMyProfile = false,
  userName = null,
  onEdit,
}) => {
  const displayName = userName || "Пользователь";

  // Определяем, какие тесты показывать
  const testsToShow = userTests || tests || [];
  const hasTests = testsToShow.length > 0;
  const completedTestsCount = userTests
    ? userTests.filter((test) => test.isCompleted).length
    : tests
    ? tests.length
    : 0;

  // Если тесты не пройдены, показываем красивый блок-заглушку
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
                : `${displayName} ещё не прошёл тесты`}
            </span>
          </div>

          {isMyProfile && onEdit && (
            <button
              onClick={onEdit}
              className="mt-3 text-purple-main hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Пройти тесты →
            </button>
          )}
        </div>
      </div>
    );
  }

  // Если тесты есть, показываем блок с тестами
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[0.875rem] font-semibold text-black-heading leading-3">
            Тесты
          </h2>

          {/* Статистика прохождения для чужого профиля */}
          {!isMyProfile && userTests && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {completedTestsCount}/{userTests.length} пройдено
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {testsToShow.map((test) => (
          <TestsItem
            key={test.uuid}
            test={test}
            isCompleted={"isCompleted" in test ? test.isCompleted : true}
          />
        ))}
      </div>
    </div>
  );
};

export default TestsBar;
