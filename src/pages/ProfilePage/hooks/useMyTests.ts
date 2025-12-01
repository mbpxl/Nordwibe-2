import { useMemo } from "react";
import { useGetTests } from "../../TestPage/service/useGetTests";
import { useGetCompletedTest } from "../../TestPage/service/useGetCompletedTests";
import type { TestType } from "../../TestPage/types/testDataTypes";

export interface MyTest extends TestType {
  isCompleted: boolean;
}

export const useMyTests = () => {
  const {
    data: allTests,
    isLoading: isTestsLoading,
    isError: isTestsError,
  } = useGetTests();

  const {
    data: completedAnswers,
    isLoading: isCompletedLoading,
    isError: isCompletedError,
  } = useGetCompletedTest();

  const myTests = useMemo((): MyTest[] => {
    if (!allTests || !completedAnswers) return [];

    // Создаем Set из ID пройденных вопросов
    const completedQuestionIds = new Set(
      completedAnswers.map((answer: any) => answer.question_id)
    );

    // Для каждого теста проверяем, есть ли в нем пройденные вопросы
    return allTests.map((test: TestType) => {
      // Проверяем, есть ли в этом тесте пройденные вопросы
      const hasCompletedQuestions = test.questions?.some((question) =>
        completedQuestionIds.has(question.uuid)
      );

      return {
        ...test,
        isCompleted: hasCompletedQuestions || false,
      };
    });
  }, [allTests, completedAnswers]);

  return {
    myTests,
    isLoading: isTestsLoading || isCompletedLoading,
    isError: isTestsError || isCompletedError,
    completedTestsCount: myTests.filter((test) => test.isCompleted).length,
    totalTestsCount: myTests.length,
  };
};
