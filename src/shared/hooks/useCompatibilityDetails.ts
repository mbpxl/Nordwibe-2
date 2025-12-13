import { useQuery } from '@tanstack/react-query';
import { useRanking } from '../../pages/SearchPage/service/useRanking';
import { useGetCompletedTest } from '../../pages/TestPage/service/useGetCompletedTests';
import { useGetTests } from '../../pages/TestPage/service/useGetTests';
import { CompatibilityService } from '../service/compatibilityService';


const compatibilityService = new CompatibilityService();

export const useCompatibilityDetails = (otherUserId: string | undefined) => {
  const { data: myTestData } = useGetCompletedTest();
  const { data: rankingData } = useRanking({});
  const { data: allTestsData } = useGetTests();

  return useQuery({
    queryKey: ['compatibility-details', otherUserId],
    queryFn: async () => {
      if (!otherUserId || !myTestData || !rankingData || !allTestsData) {
        throw new Error('Недостаточно данных для вычисления совместимости');
      }

      const otherUserAnswers = compatibilityService.findUserAnswers(rankingData, otherUserId);

      return compatibilityService.getCompatibilityDetails(
        myTestData,
        otherUserAnswers,
        allTestsData
      );
    },
    enabled: !!otherUserId && !!myTestData && !!rankingData && !!allTestsData,
    staleTime: 5 * 60 * 1000,
  });
};