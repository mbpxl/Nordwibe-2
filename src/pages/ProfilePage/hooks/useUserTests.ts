import { useMemo } from "react";
import { useGetTests } from "../../TestPage/service/useGetTests";
import { useRanking } from "../../SearchPage/service/useRanking";

export interface UserTest {
  uuid: string;
  title: string;
  description: string;
  image_url: string;
  is_important: boolean;
  isCompleted: boolean;
}

export const useUserTests = (userId: string | undefined) => {
  const {
    data: allTests,
    isLoading: isTestsLoading,
    isError: isTestsError,
  } = useGetTests();
  const {
    data: rankingData,
    isLoading: isRankingLoading,
    isError: isRankingError,
  } = useRanking();

  const userTests = useMemo((): UserTest[] => {
    if (!allTests || !userId) return [];

    // Находим данные пользователя в рейтинге
    const userRanking = rankingData?.find((item) => item.user_id === userId);
    const completedTestIds = userRanking?.tests_ids || [];

    // Сопоставляем все тесты с информацией о прохождении
    return allTests.map((test: any) => ({
      ...test,
      isCompleted: completedTestIds.includes(test.uuid),
    }));
  }, [allTests, rankingData, userId]);

  return {
    userTests,
    isLoading: isTestsLoading || isRankingLoading,
    isError: isTestsError || isRankingError,
    completedTestsCount: userTests.filter((test) => test.isCompleted).length,
    totalTestsCount: userTests.length,
  };
};
