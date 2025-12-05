export type UserAnswer = [string, string];
export type RankingUser = {
  user_id: string;
  score: number;
  tests_ids: string[];
  answers: UserAnswer[][];
};
