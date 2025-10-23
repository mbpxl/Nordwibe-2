export type Scale = "EXTRAVERSION" | "NEATNESS" | "LOYALTY";

export type SelectedAnswer = {
  questionId: string;
  answerId: string;
  value: number;
};

export type ScaleMap = Record<string, Scale>;
