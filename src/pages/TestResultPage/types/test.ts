export type Scale = "EXTRAVERSION" | "NEATNESS" | "LOYALTY";

export type SelectedAnswer = {
  questionId: string; // uuid вопроса
  answerId: string; // uuid ответа (для API)
  value: number; // вес ответа (для расчёта результата)
};

export type ScaleMap = Record<string, Scale>; // key = questionId(uuid)
