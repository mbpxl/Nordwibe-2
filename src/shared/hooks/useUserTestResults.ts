import { useEffect, useMemo } from "react";
import { useRanking } from "../../pages/SearchPage/service/useRanking";
import { useGetTests } from "../../pages/TestPage/service/useGetTests";
import { calculateTestResult } from "../utils/testResults";

export const useUserTestResults = (userId: string) => {
  const { data: tests, isLoading: testsLoading } = useGetTests();
  const { data: rankingData, isLoading: rankingLoading } = useRanking();

  const userRanking = useMemo(() => {
    if (!rankingData) return null;
    return rankingData.find((user) => user.user_id === userId) || null;
  }, [rankingData, userId]);

  // Добавьте в начало файла для отладки
  useEffect(() => {
    if (tests && userRanking) {
      console.log("=== ДЕТАЛЬНАЯ ДИАГНОСТИКА ===");
      console.log(
        "Все тесты из useGetTests:",
        tests.map((t: any) => ({
          title: t.title,
          uuid: t.uuid,
          is_important: t.is_important,
          questions_count: t.questions?.length || 0,
        }))
      );

      console.log("Тесты пользователя из ranking:", userRanking.tests_ids);

      // Проверяем соответствие тестов
      const testMatches = tests.filter((test: any) =>
        userRanking.tests_ids.includes(test.uuid)
      );

      console.log(
        "Совпадающие тесты:",
        testMatches.map((t: any) => ({
          title: t.title,
          uuid: t.uuid,
          is_important: t.is_important,
        }))
      );
    }
  }, [tests, userRanking]);

  const results = useMemo(() => {
    if (
      !tests?.length ||
      !userRanking?.tests_ids?.length ||
      !userRanking.answers?.length
    ) {
      console.log("❌ Недостаточно данных для расчета результатов");
      return [];
    }

    console.log("=== ОБРАБОТКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ ===");
    console.log("ID пользователя:", userId);
    console.log("Все пройденные тесты (IDs):", userRanking.tests_ids);
    console.log("Количество ответов в answers:", userRanking.answers.length);
    console.log("Структура первого ответа:", userRanking.answers[0]);

    // ИСПРАВЛЕНИЕ: Правильная логика выбора тестов

    // 1. Фильтруем тесты: исключаем тест на совместимость
    const nonImportantTests = tests.filter(
      (test: any) =>
        !test.is_important && userRanking.tests_ids.includes(test.uuid)
    );

    console.log(
      "Тесты без совместимости:",
      nonImportantTests.map((t: any) => t.title)
    );

    // 2. Если нет подходящих тестов - возвращаем пустой массив
    if (nonImportantTests.length === 0) {
      console.warn(
        "❌ Нет тестов для отображения результатов (исключены тесты на совместимость)"
      );
      return [];
    }

    // 3. Берем ПЕРВЫЙ тест из подходящих (предполагаем, что answers относятся к нему)
    // В будущем можно будет расширить логику для поддержки нескольких тестов
    const targetTest = nonImportantTests[0];
    console.log(
      "✅ Выбран тест для расчета:",
      targetTest.title,
      targetTest.uuid
    );

    // 4. Используем ВСЕ ответы из answers для расчета
    const userTestAnswers = userRanking.answers;

    try {
      console.log(
        `\nРасчет результата для теста: ${targetTest.title} (${targetTest.uuid})`
      );
      console.log(
        `Количество вопросов в тесте: ${targetTest.questions?.length || 0}`
      );
      console.log(`Количество ответов пользователя: ${userTestAnswers.length}`);

      const result = calculateTestResult(targetTest, userTestAnswers);

      if (
        result.letter === "—" ||
        !result.description ||
        result.description.includes("недостаточно данных")
      ) {
        console.warn(
          `❌ Некорректный результат для теста ${targetTest.uuid}:`,
          result
        );
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
            description: result.description,
            imageUrl: result.imageUrl,
          },
        },
      ];
    } catch (error) {
      console.error(
        `💥 Критическая ошибка расчета результата для теста ${targetTest.uuid}:`,
        error
      );
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
