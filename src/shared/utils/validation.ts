import type { UserAnswer } from "../types/ranking";

export const validateTestData = (test: any, userAnswers: UserAnswer[]) => {
  console.log("\n=== ВАЛИДАЦИЯ ДАННЫХ ТЕСТА ===");
  console.log(`Тест: ${test.title} (${test.uuid})`);

  // Проверяем соответствие количества вопросов и ответов
  if (test.questions.length !== userAnswers.length) {
    console.warn(
      `⚠️ Несоответствие количества: вопросов ${test.questions.length}, ответов ${userAnswers.length}`
    );
  }

  // Проверяем, что все questionId из ответов существуют в тесте
  const testQuestionIds = new Set(test.questions.map((q: any) => q.uuid));
  const missingQuestions = userAnswers.filter(
    ([qId]) => !testQuestionIds.has(qId)
  );

  if (missingQuestions.length > 0) {
    console.warn(
      `⚠️ Не найдены вопросы для ${missingQuestions.length} ответов:`,
      missingQuestions.map(([qId]) => qId)
    );
  }

  // Проверяем, что все answerId существуют в соответствующих вопросах
  let missingAnswers = 0;
  userAnswers.forEach(([qId, aId]) => {
    const question = test.questions.find((q: any) => q.uuid === qId);
    if (question) {
      const answerExists = question.answers.some((a: any) => a.uuid === aId);
      if (!answerExists) {
        missingAnswers++;
        console.warn(`⚠️ Не найден ответ ${aId} для вопроса ${qId}`);
      }
    }
  });

  if (missingAnswers > 0) {
    console.warn(`⚠️ Всего не найдено ответов: ${missingAnswers}`);
  }

  console.log("=== ВАЛИДАЦИЯ ЗАВЕРШЕНА ===");
};
