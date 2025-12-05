export type AnswerType = {
  uuid: string;
  answer: string;
  value: number;
};

export type QuestionType = {
  uuid: string;
  question: string;
  description: string;
  image_url: string;
  answers: AnswerType[];
};

export type TestType = {
  uuid: string;
  title: string;
  description: string;
  image_url: string;
  is_important: boolean;
  time?: number;
  questions: QuestionType[];
  isCompleted?: boolean;
};

export type TestsResponse = TestType[];
