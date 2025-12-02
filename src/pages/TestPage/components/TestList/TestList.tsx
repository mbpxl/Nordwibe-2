import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../shared/Components/Loading/Loading";
import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { baseURLforImages } from "../../../../shared/plugin/axios";
import AllQuizCompleted from "../../../QuizPage/Components/AllQuizCompleted/AllQuizCompleted";
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
    (completedTests || []).map((ans: any) => ans.question_id)
  );

  const passedTests = (allTests || []).filter((test: any) =>
    (test.questions || []).some((q: any) => completedQuestionIds.has(q.uuid))
  );

  const availableTests = (allTests || []).filter(
    (test: any) =>
      !(test.questions || []).some((q: any) => completedQuestionIds.has(q.uuid))
  );

  // тест на совместимость всегда первый
  const sortedAvailableTests = [...availableTests].sort((a, b) => {
    const isACompatibility = a.title === "Тест на совместимость";
    const isBCompatibility = b.title === "Тест на совместимость";

    if (isACompatibility && !isBCompatibility) return -1;
    if (!isACompatibility && isBCompatibility) return 1;
    return 0;
  });

  console.log("Available tests: ", sortedAvailableTests);

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Wrapper className="min-h-screen pt-1 pb-12 bg-purple-background-wrap flex flex-col items-center">
          <div className="max-w-[600px]">
            <ProgressBar
              progress={passedTests.length}
              totalProgress={allTests.length}
              title={"тест"}
            />

            <div className="">
              {sortedAvailableTests.length === 0 ? (
                <AllQuizCompleted title={"тесты"} />
              ) : (
                sortedAvailableTests.map((item: any, index: number) => (
                  <div key={item.uuid ?? index} className="mb-4">
                    <TestItem
                      uuid={item.uuid}
                      time={5}
                      title={item.title}
                      description={item.description}
                      image_url={baseURLforImages + item.image_url}
                      is_important={false}
                      questions={item.questions}
                      isDesktop={false}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </Wrapper>
      )}
      {/* Desktop версия */}
      {isDesktop && (
        <div className="h-full flex flex-col">
          <div className="p-6 pb-4">
            <ProgressBar
              progress={passedTests.length}
              totalProgress={allTests.length}
              title={"тест"}
            />
          </div>

          {/* Список тестов с прокруткой */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {sortedAvailableTests.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                <h3 className="text-lg font-medium mb-2">
                  Все тесты пройдены!
                </h3>
                <p className="text-gray-500 text-center">
                  Вы успешно прошли все доступные тесты
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedAvailableTests.map((item: any, index: number) => (
                  <TestItem
                    key={item.uuid ?? index}
                    uuid={item.uuid}
                    time={5}
                    title={item.title}
                    description={item.description}
                    image_url={baseURLforImages + item.image_url}
                    is_important={false}
                    questions={item.questions}
                    isDesktop={true}
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
