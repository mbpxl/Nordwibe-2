import { useMemo } from "react";
import { useGetTests } from "../../pages/TestPage/service/useGetTests";
import { calculateTestResult } from "../utils/testResults";
import { useGetCompletedTest } from "../../pages/TestPage/service/useGetCompletedTests";

export const useMyTestResults = () => {
  const { data: tests, isLoading: testsLoading } = useGetTests();
  const { data: completedTests, isLoading: completedTestsLoading } = useGetCompletedTest();

  const results = useMemo(() => {
    if (!tests?.length || !completedTests?.length) return [];

    // Преобразуем данные из нового формата в старый
    // Группируем ответы по тестам
    const answersByTest: Record<string, [string, string][]> = {};

    // Получаем все вопросы из всех тестов для поиска по question_id
    const allQuestions = tests.flatMap((test: any) =>
      test.questions.map((question: any) => ({
        ...question,
        testUuid: test.uuid
      }))
    );

    // Группируем ответы по тестам
    completedTests.forEach((answer: any) => {
      const question = allQuestions.find((q: any) => q.uuid === answer.question_id);
      if (question) {
        const testUuid = question.testUuid;
        if (!answersByTest[testUuid]) {
          answersByTest[testUuid] = [];
        }
        answersByTest[testUuid].push([answer.question_id, answer.answer_id]);
      }
    });

    // Фильтруем тесты: исключаем тест на совместимость
    return tests
      .filter((test: any) =>
        !test.is_important &&
        answersByTest[test.uuid]?.length > 0
      )
      .map((test: any) => {
        const userTestAnswers = answersByTest[test.uuid] || [];

        try {
          const result = calculateTestResult(test, userTestAnswers);

          if (result.letter === '—' || !result.description) {
            return null;
          }

          return {
            testId: test.uuid,
            title: test.title,
            description: test.description,
            imageUrl: test.image_url,
            result: {
              letter: result.letter,
              test_title: result.test_title,
              description: result.description,
              imageUrl: result.imageUrl,
            },
          };
        } catch (error) {
          return null;
        }
      })
      .filter((result: any): result is NonNullable<typeof result> => result !== null);
  }, [tests, completedTests]);

  return {
    results,
    isLoading: testsLoading || completedTestsLoading,
    hasData: !!results.length,
  };
};