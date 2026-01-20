import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../shared/Components/Loading/Loading";
import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { baseURLforImages } from "../../../../shared/plugin/axios";
import { useGetCompletedTest } from "../../service/useGetCompletedTests";
import { useGetTests } from "../../service/useGetTests";
import TestItem from "../TestItem/TestItem";

interface TestListProps {
  isDesktop?: boolean;
}

const TestList = ({ isDesktop = false }: TestListProps) => {
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
    (completedTests || []).map((ans: any) => ans.question_id),
  );

  // Обогащаем тесты информацией о статусе прохождения
  const enrichedTests = (allTests || []).map((test: any) => {
    const questions = test.questions || [];
    const completedQuestions = questions.filter((q: any) =>
      completedQuestionIds.has(q.uuid),
    );
    const isCompleted = completedQuestions.length > 0;
    const completionRate = isCompleted
      ? Math.round((completedQuestions.length / questions.length) * 100)
      : 0;

    return {
      ...test,
      isCompleted,
      completionRate,
      completedQuestionsCount: completedQuestions.length,
      totalQuestionsCount: questions.length,
    };
  });

  // Сортируем: сначала тест на совместимость, затем завершенные, затем незавершенные
  const sortedTests = [...enrichedTests].sort((a, b) => {
    const isACompatibility = a.title === "Тест на совместимость";
    const isBCompatibility = b.title === "Тест на совместимость";

    // Тест на совместимость всегда первый
    if (isACompatibility && !isBCompatibility) return -1;
    if (!isACompatibility && isBCompatibility) return 1;

    // Затем завершенные тесты
    if (a.isCompleted && !b.isCompleted) return -1;
    if (!a.isCompleted && b.isCompleted) return 1;

    // Остальные по алфавиту
    return a.title.localeCompare(b.title);
  });

  const completedTestsCount = enrichedTests.filter(
    (test: any) => test.isCompleted,
  ).length;

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Wrapper className="min-h-screen pt-1 pb-12 bg-purple-background-wrap flex flex-col items-center">
          <div className="max-w-[600px] w-full">
            <ProgressBar
              progress={completedTestsCount}
              totalProgress={allTests.length}
              title={"тест"}
            />

            <div className="w-full px-4">
              {sortedTests.map((item: any, index: number) => (
                <div key={item.uuid ?? index} className="mb-4">
                  <TestItem
                    uuid={item.uuid}
                    time={5}
                    title={item.title}
                    description={item.description}
                    image_url={baseURLforImages + item.image_url}
                    isDesktop={false}
                    isCompleted={item.isCompleted}
                  />
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div className="h-full flex flex-col">
          <div className="p-6 pb-4">
            <ProgressBar
              progress={completedTestsCount}
              totalProgress={allTests.length}
              title={"тест"}
            />
          </div>

          {/* Список тестов с прокруткой */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {sortedTests.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                <h3 className="text-lg font-medium mb-2">Тесты не найдены</h3>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTests.map((item: any, index: number) => (
                  <TestItem
                    key={item.uuid ?? index}
                    uuid={item.uuid}
                    time={5}
                    title={item.title}
                    description={item.description}
                    image_url={baseURLforImages + item.image_url}
                    isDesktop={true}
                    isCompleted={item.isCompleted}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TestList;
