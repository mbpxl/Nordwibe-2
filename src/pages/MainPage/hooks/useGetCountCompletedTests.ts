import { useGetCompletedTest } from "../../TestPage/service/useGetCompletedTests";
import { useGetTests } from "../../TestPage/service/useGetTests";

export const useGetCountCompletedTests = () => {
  const {
    data: tests,
    isLoading: testsLoading,
    isError: testsError,
  } = useGetTests();
  const {
    data: completedTests,
    isLoading: completedLoading,
    isError: completedError,
  } = useGetCompletedTest();

  const isLoading = testsLoading || completedLoading;
  const isError = testsError || completedError;

  let completedCount = 0;
  let totalCount = 0;

  if (tests && completedTests) {
    totalCount = tests.length;

    const completedQuestionIds = new Set(
      completedTests.map((test: any) => test.question_id)
    );

    tests.forEach((test: any) => {
      const allQuestionsAnswered = test.questions.every((question: any) =>
        completedQuestionIds.has(question.uuid)
      );

      if (allQuestionsAnswered) {
        completedCount++;
      }
    });
  }

  return {
    completedTestsCount: completedCount,
    totalTests: totalCount,
    isLoading,
    isError,
  };
};
