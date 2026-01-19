interface TestAnswer {
  uuid: string;
  answer: string;
  value: number;
}

interface TestQuestion {
  uuid: string;
  question: string;
  answers: TestAnswer[];
}

interface UserAnswerPair {
  question_id: string;
  answer_id: string;
}

interface RankingUser {
  user_id: string;
  answers: Array<[string, string]>;
}

export interface ComparedTrait {
  questionId: string;
  questionText: string;
  myAnswer: string;
  theirAnswer: string;
  myValue: number;
  theirValue: number;
  difference: number;
}

export interface CompatibilityDetails {
  totalQuestions: number;
  topSimilar: ComparedTrait[];
  topDifferent: ComparedTrait[];
}

export class CompatibilityService {
  private targetTestId = "cfd48889-06ca-4edf-832e-248b7ed534b2";

  // В сервисе compatibilityService.ts обновите метод getCompatibilityDetails:
  getCompatibilityDetails(
    myAnswers: UserAnswerPair[],
    otherUserAnswers: Array<[string, string]>,
    allTests: any[]
  ): CompatibilityDetails {
    const targetTest = allTests.find(
      (test: any) => test.uuid === this.targetTestId
    );
    if (!targetTest) {
      throw new Error(`Тест с ID ${this.targetTestId} не найден`);
    }

    const compared: ComparedTrait[] = [];

    for (const myAnswer of myAnswers) {
      const question = targetTest.questions.find(
        (q: TestQuestion) => q.uuid === myAnswer.question_id
      );
      if (!question) continue;

      const otherUserAnswerPair = otherUserAnswers.find(
        ([qId]) => qId === myAnswer.question_id
      );
      const otherAnswerId = otherUserAnswerPair ? otherUserAnswerPair[1] : null;

      const myAnswerObj = question.answers.find(
        (a: TestAnswer) => a.uuid === myAnswer.answer_id
      );
      const otherAnswerObj = otherAnswerId
        ? question.answers.find((a: TestAnswer) => a.uuid === otherAnswerId)
        : null;

      if (!myAnswerObj || !otherAnswerObj) continue;

      compared.push({
        questionId: question.uuid,
        questionText: question.question,
        myAnswer: myAnswerObj.answer,
        theirAnswer: otherAnswerObj.answer,
        myValue: myAnswerObj.value,
        theirValue: otherAnswerObj.value,
        difference: Math.abs(myAnswerObj.value - otherAnswerObj.value),
      });
    }

    if (compared.length === 0) {
      return {
        totalQuestions: 0,
        topSimilar: [],
        topDifferent: [],
      };
    }

    const sortedByDifference = [...compared].sort(
      (a, b) => a.difference - b.difference
    );

    const getTopSimilar = () => {
      const same = sortedByDifference.filter((item) => item.difference === 0);
      if (same.length >= 2) return same.slice(0, 2);
      if (same.length === 1) {
        const diff1 = sortedByDifference.filter(
          (item) => item.difference === 1
        );
        return diff1.length >= 1 ? [same[0], diff1[0]] : [same[0]];
      }

      const diff1 = sortedByDifference.filter((item) => item.difference === 1);
      if (diff1.length >= 2) return diff1.slice(0, 2);
      if (diff1.length === 1) {
        const diff2 = sortedByDifference.filter(
          (item) => item.difference === 2
        );
        return diff2.length >= 1 ? [diff1[0], diff2[0]] : [diff1[0]];
      }

      const diff2 = sortedByDifference.filter((item) => item.difference === 2);
      if (diff2.length >= 2) return diff2.slice(0, 2);
      if (diff2.length === 1) {
        const diff3 = sortedByDifference.filter(
          (item) => item.difference === 3
        );
        return diff3.length >= 1 ? [diff2[0], diff3[0]] : [diff2[0]];
      }

      return sortedByDifference.slice(0, 2);
    };

    const getTopDifferent = () => {
      const allQuestions = [...compared];
      const similarIds = getTopSimilar().map((item) => item.questionId);

      const availableForDifferent = allQuestions
        .filter((item) => !similarIds.includes(item.questionId))
        .sort((a, b) => b.difference - a.difference);

      const diff3 = availableForDifferent.filter(
        (item) => item.difference >= 3
      );
      if (diff3.length >= 2) return diff3.slice(0, 2);
      if (diff3.length === 1) {
        const diff2 = availableForDifferent.filter(
          (item) => item.difference === 2
        );
        return diff2.length >= 1 ? [diff3[0], diff2[0]] : [diff3[0]];
      }

      const diff2 = availableForDifferent.filter(
        (item) => item.difference === 2
      );
      if (diff2.length >= 2) return diff2.slice(0, 2);
      if (diff2.length === 1) {
        const diff1 = availableForDifferent.filter(
          (item) => item.difference === 1
        );
        return diff1.length >= 1 ? [diff2[0], diff1[0]] : [diff2[0]];
      }

      const diff1 = availableForDifferent.filter(
        (item) => item.difference === 1
      );
      if (diff1.length >= 2) return diff1.slice(0, 2);

      return availableForDifferent.slice(0, 2);
    };

    const topSimilar = getTopSimilar();
    const topDifferent = getTopDifferent();

    return {
      totalQuestions: compared.length,
      topSimilar,
      topDifferent,
    };
  }

  findUserAnswers(
    rankingData: RankingUser[],
    userId: string
  ): Array<[string, string]> {
    const user = rankingData.find((u) => u.user_id === userId);
    return user ? user.answers : [];
  }
}
