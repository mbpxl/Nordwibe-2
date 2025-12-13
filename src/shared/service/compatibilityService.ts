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

interface CompatibilityTest {
  uuid: string;
  questions: TestQuestion[];
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
  similarTraits: ComparedTrait[];
  differentTraits: ComparedTrait[];
}

export class CompatibilityService {
  private targetTestId = "cfd48889-06ca-4edf-832e-248b7ed534b2";

  async getCompatibilityDetails(
    myAnswers: UserAnswerPair[],
    otherUserAnswers: Array<[string, string]>,
    allTests: any[]
  ): Promise<CompatibilityDetails> {
    const targetTest = allTests.find((test: any) => test.uuid === this.targetTestId) as CompatibilityTest;
    if (!targetTest) {
      throw new Error(`Тест с ID ${this.targetTestId} не найден`);
    }

    const compared: ComparedTrait[] = [];

    for (const myAnswer of myAnswers) {
      const question = targetTest.questions.find((q: TestQuestion) => q.uuid === myAnswer.question_id);
      if (!question) continue;

      const otherUserAnswerPair = otherUserAnswers.find(([qId]) => qId === myAnswer.question_id);
      const otherAnswerId = otherUserAnswerPair ? otherUserAnswerPair[1] : null;

      const myAnswerObj = question.answers.find((a: TestAnswer) => a.uuid === myAnswer.answer_id);
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

    const sortedByDifference = [...compared].sort((a, b) => a.difference - b.difference);

    const similarTraits = sortedByDifference.filter(item => item.difference <= 1);
    const differentTraits = [...compared]
      .filter(item => item.difference >= 2)
      .sort((a, b) => b.difference - a.difference);

    return {
      totalQuestions: compared.length,
      similarTraits,
      differentTraits,
    };
  }

  findUserAnswers(rankingData: RankingUser[], userId: string): Array<[string, string]> {
    const user = rankingData.find(u => u.user_id === userId);
    return user ? user.answers : [];
  }
}