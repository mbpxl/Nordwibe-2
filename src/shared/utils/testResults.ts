import { getTestResultData } from "../data/testResultsData";

export const valueToLetter = (value: number): string => {
  const letters = ["А", "Б", "В", "Г", "Д"];
  return letters[value - 1] || "";
};

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
  userTestAnswers: [string, string][]
): {
  letter: string;
  test_title: string;
  description: string;
  imageUrl?: string;
} => {
  const answersMap = new Map<string, string>();
  userTestAnswers.forEach(([questionId, answerId]) => {
    if (questionId && answerId) {
      answersMap.set(questionId, answerId);
    }
  });

  const answerLetters = (test.questions || [])
    .map((question: any) => {
      const answerId = answersMap.get(question.uuid);
      if (!answerId) return null;

      const answer = question.answers?.find((a: any) => a.uuid === answerId);
      if (!answer) return null;

      return valueToLetter(answer.value);
    })
    .filter((letter: any): letter is string => letter !== null && letter !== "");

  if (answerLetters.length === 0) {
    return {
      letter: "—",
      test_title: "Результат недоступен",
      description: "Недостаточно данных для расчета",
      imageUrl: undefined,
    };
  }

  const resultLetter = getMostFrequentResult(answerLetters);
  const resultData = getTestResultData(test.uuid, resultLetter);

  return {
    letter: resultLetter,
    test_title: resultData.test_title,
    description: resultData.description,
    imageUrl: resultData.imageUrl,
  };
};