import { useParams } from "react-router-dom";
import TestList from "./components/TestList/TestList";
import TestSlide from "../TestPassingPage/components/TestSlide/TestSlide";
import { useGetTests } from "./service/useGetTests";
import Loading from "../../shared/Components/Loading/Loading";
import Error from "../../shared/Components/ErrorPage/ErrorPage";
import { useGetCompletedTest } from "./service/useGetCompletedTests";

const TestDesktopPage = () => {
  const { uuid } = useParams<{ uuid?: string }>();

  const {
    data: allTests,
    isLoading: isTestsLoading,
    isError: isTestsError,
  } = useGetTests();

  const {
    data: completedTests,
    isLoading: isCompletedLoading,
    isError: isCompletedError,
  } = useGetCompletedTest();

  if (isTestsLoading || isCompletedLoading) {
    return <Loading />;
  }

  if (isTestsError || isCompletedError) {
    return <Error />;
  }

  const completedQuestionIds = new Set(
    (completedTests || []).map((ans: any) => ans.question_id)
  );

  const availableTests = (allTests || []).filter(
    (test: any) =>
      !(test.questions || []).some((q: any) => completedQuestionIds.has(q.uuid))
  );

  const sortedAvailableTests = [...availableTests].sort((a, b) => {
    const isACompatibility = a.title === "Тест на совместимость";
    const isBCompatibility = b.title === "Тест на совместимость";

    if (isACompatibility && !isBCompatibility) return -1;
    if (!isACompatibility && isBCompatibility) return 1;
    return 0;
  });

  return (
    <div className="max-w-[1340px] mx-auto px-4 py-6">
      <div className="flex gap-8" style={{ height: "calc(100vh - 140px)" }}>
        <div className="w-full max-w-[552px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm h-full flex flex-col overflow-hidden">
            <TestList isDesktop={true} />
          </div>
        </div>

        {/* Правая колонка - тест */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm h-full flex flex-col overflow-hidden">
            {uuid ? (
              <TestSlide key={uuid} isDesktop={true} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                {sortedAvailableTests.length == 0 ? (
                  <div className="text-center">
                    <p className="text-gray-500 text-center">
                      Ожидайте появления новых тестов
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-2">Выберите тест</h3>
                    <p className="text-gray-500 text-center">
                      Выберите тест из списка слева, чтобы начать прохождение
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDesktopPage;
