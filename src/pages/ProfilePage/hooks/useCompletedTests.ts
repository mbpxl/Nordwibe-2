import { useMemo } from "react";
import { useGetCompletedTest } from "../../TestPage/service/useGetCompletedTests";
import { useGetTests } from "../../TestPage/service/useGetTests";
import type { TestType } from "../../TestPage/types/testDataTypes";

export const useCompletedTests = () => {
  const {
    data: allTests,
    isLoading: isLoadingTests,
    isError: isErrorTests,
  } = useGetTests();

  const {
    data: completedAnswers,
    isLoading: isLoadingCompleted,
    isError: isErrorCompleted,
  } = useGetCompletedTest();

  const isLoading = isLoadingTests || isLoadingCompleted;
  const isError = isErrorTests || isErrorCompleted;

  const completedTests = useMemo(() => {
    if (!allTests || !completedAnswers) return [];

    // получаем ID вопросов, которые пользователь проходил
    const completedQuestionIds = new Set(
      completedAnswers.map((a: any) => a.question_id)
    );

    // фильтруем тесты: берём только те, где есть вопросы из completedQuestionIds
    return allTests.filter((test: TestType) =>
      test.questions?.some((q) => completedQuestionIds.has(q.uuid))
    );
  }, [allTests, completedAnswers]);

  return { data: completedTests, isLoading, isError };
};
