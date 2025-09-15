import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../shared/Components/Loading/Loading";
import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { baseURLforImages } from "../../../../shared/plugin/axios";
import AllQuizCompleted from "../../../QuizPage/Components/AllQuizCompleted/AllQuizCompleted";
import { useGetCompletedTest } from "../../service/useGetCompletedTests";
import { useGetTests } from "../../service/useGetTests";
import TestItem from "../TestItem/TestItem";

const TestList = () => {
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

  return (
    <Wrapper className="min-h-screen pt-1 pb-12 bg-purple-background-wrap flex flex-col items-center">
      <div className="max-w-[600px]">
        <ProgressBar
          progress={passedTests.length}
          totalProgress={allTests.length}
          title={"тест"}
        />

        <div className="">
          {availableTests.length === 0 ? (
            <AllQuizCompleted title={"тесты"} />
          ) : (
            availableTests.map((item: any, index: number) => (
              <div key={item.uuid ?? index} className="mb-4">
                <TestItem
                  uuid={item.uuid}
                  time={5}
                  title={item.title}
                  description={item.description}
                  image_url={baseURLforImages + item.image_url}
                  is_important={false}
                  questions={item.questions}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default TestList;
