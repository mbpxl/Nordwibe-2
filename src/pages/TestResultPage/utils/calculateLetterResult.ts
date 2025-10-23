// src/TestResultPage/utils/calculateLetterResult.ts
import type { SelectedAnswer } from "../types/test";

export interface LetterTestResult {
  title: string;
  description: string;
}

export const calculateLetterResult = (
  answers: SelectedAnswer[]
): LetterTestResult => {
  // answers[].value теперь — код буквы (0..4), а не балл
  const counts: Record<string, number> = {};

  for (const a of answers) {
    // допустим, value хранит индекс буквы: 0 = А, 1 = Б, 2 = В, 3 = Г, 4 = Д
    const letter = ["А", "Б", "В", "Г", "Д"][a.value!] ?? "А";
    counts[letter] = (counts[letter] || 0) + 1;
  }

  // Определяем букву с максимальным количеством выборов
  let maxLetter = "А";
  let maxCount = 0;
  for (const [letter, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxLetter = letter;
    }
  }

  // Карта финальных результатов
  const resultsMap: Record<string, LetterTestResult> = {
    А: {
      title: "Супермен",
      description:
        "Ты не терпишь несправедливости и всегда готов прийти на помощь. С тобой соседи чувствуют уверенность и порядок.",
    },
    Б: {
      title: "Кто сказал party?",
      description:
        "Ты душа компании! Любишь веселье, шум и общение. С тобой точно не соскучишься.",
    },
    В: {
      title: "Френдли, но не таг",
      description:
        "Ты дружелюбен, но ценишь личные границы. Умеешь находить баланс между общением и уединением.",
    },
    Г: {
      title: "Скрудж Макдак",
      description:
        "Ты ответственный и практичный. Всегда контролируешь расходы и не любишь беспорядок.",
    },
    Д: {
      title: "Саппорт",
      description:
        "Ты отзывчивый и надёжный человек, на которого можно положиться в любых ситуациях.",
    },
  };

  return (
    resultsMap[maxLetter] ?? {
      title: "Уникальный результат",
      description:
        "Ты непредсказуем и многогранен, твой характер не вписывается в шаблоны!",
    }
  );
};
