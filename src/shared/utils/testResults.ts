import {
  getTestResultDescription,
  getTestResultImage,
} from "../data/testResultsData";

// Перевод числового значения в букву
export const valueToLetter = (value: number): string => {
  const letters = ["А", "Б", "В", "Г", "Д"];
  return letters[value - 1] || "";
};

// Определение самого частого ответа
export const getMostFrequentResult = (letters: string[]): string => {
  if (!letters.length) return "—";

  const counts = letters.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxCount = Math.max(...Object.values(counts));
  const mostFrequent =
    Object.keys(counts).find((letter) => counts[letter] === maxCount) || "—";

  return mostFrequent;
};

export const calculateTestResult = (
  test: any,
  userTestAnswers: [string, string][] // Гарантированно правильный формат
): {
  letter: string;
  description: string;
  imageUrl?: string;
} => {
  console.log(`\n=== РАСЧЕТ РЕЗУЛЬТАТА ===`);
  console.log(`Тест: ${test.title} (${test.uuid})`);
  console.log(`Вопросов в тесте: ${test.questions?.length || 0}`);
  console.log(`Ответов пользователя: ${userTestAnswers.length}`);

  // Создаем Map для быстрого поиска ответов по questionId
  const answersMap = new Map<string, string>();
  userTestAnswers.forEach(([questionId, answerId], index) => {
    if (questionId && answerId) {
      answersMap.set(questionId, answerId);
      console.log(
        `✅ Ответ #${index + 1}: ${questionId.substring(
          0,
          8
        )}... -> ${answerId.substring(0, 8)}...`
      );
    } else {
      console.warn(`⚠️ Некорректный ответ #${index + 1}:`, [
        questionId,
        answerId,
      ]);
    }
  });

  // Собираем буквы для всех ответов
  const answerLetters = (test.questions || [])
    .map((question: any, qIndex: number) => {
      const answerId = answersMap.get(question.uuid);

      if (!answerId) {
        console.warn(
          `❌ Ответ не найден для вопроса ${question.uuid.substring(
            0,
            8
          )}... (#${qIndex + 1})`,
          "Всего ответов:",
          answersMap.size
        );
        return null;
      }

      const answer = question.answers?.find((a: any) => a.uuid === answerId);
      if (!answer) {
        console.warn(
          `❌ Вариант ответа не найден: ${answerId.substring(
            0,
            8
          )}... для вопроса ${question.uuid.substring(0, 8)}...`,
          "Всего вариантов:",
          question.answers?.length || 0
        );
        return null;
      }

      const letter = valueToLetter(answer.value);
      console.log(
        `✅ Вопрос #${qIndex + 1}: ${question.uuid.substring(
          0,
          8
        )}... -> ответ ${answer.uuid.substring(0, 8)}... (value=${
          answer.value
        }) -> буква ${letter}`
      );
      return letter;
    })
    .filter(
      (letter: any): letter is string => letter !== null && letter !== ""
    );

  console.log("📊 Полученные буквы:", answerLetters);

  if (answerLetters.length === 0) {
    console.error(`❌ Нет корректных ответов для расчета`);
    return {
      letter: "—",
      description: "Недостаточно данных для расчета",
      imageUrl: undefined,
    };
  }

  const resultLetter = getMostFrequentResult(answerLetters);
  console.log(`🎯 Самая частая буква: ${resultLetter}`);

  return {
    letter: resultLetter,
    description: getTestResultDescription(test.uuid, resultLetter),
    imageUrl: getTestResultImage(test.uuid, resultLetter),
  };
};
