import { useMemo } from "react";
import { useRanking } from "../../pages/SearchPage/service/useRanking";
import { useGetTests } from "../../pages/TestPage/service/useGetTests";
import { calculateTestResult } from "../utils/testResults";

export const useUserTestResults = (userId: string) => {
  const { data: tests, isLoading: testsLoading } = useGetTests();
  const { data: rankingData, isLoading: rankingLoading } = useRanking({});

  const userRanking = useMemo(() => {
    if (!rankingData) return null;
    return rankingData.find((user) => user.user_id === userId) || null;
  }, [rankingData, userId]);

  const results = useMemo(() => {
    if (
      !tests?.length ||
      !userRanking?.tests_ids?.length ||
      !userRanking.answers?.length
    ) {
      return [];
    }

    const nonImportantTests = tests.filter(
      (test: any) =>
        !test.is_important && userRanking.tests_ids.includes(test.uuid)
    );

    if (nonImportantTests.length === 0) {
      return [];
    }

    const targetTest = nonImportantTests[0];
    const userTestAnswers = userRanking.answers;

    try {
      const result = calculateTestResult(targetTest, userTestAnswers);

      if (
        result.letter === "—" ||
        !result.description ||
        result.description.includes("недостаточно данных")
      ) {
        return [];
      }

      return [
        {
          testId: targetTest.uuid,
          title: targetTest.title,
          description: targetTest.description,
          imageUrl: targetTest.image_url,
          result: {
            letter: result.letter,
            test_title: result.test_title,
            description: result.description,
            imageUrl: result.imageUrl,
          },
        },
      ];
    } catch (error) {
      return [];
    }
  }, [tests, userRanking]);

  return {
    results,
    isLoading: testsLoading || rankingLoading,
    hasData: !!results.length,
    error: !userRanking && !rankingLoading && !rankingData?.length,
  };
};