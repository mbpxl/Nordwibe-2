import { useGetCompletedQuizes } from "../../QuizPage/service/useGetCompletedQuizes";
import { useGetQuiz } from "../../QuizPage/service/useGetQuiz";

export const useQuizProgress = () => {
  const {
    data: allQuizzes,
    isLoading: quizzesLoading,
    isError: quizzesError,
  } = useGetQuiz();

  const {
    data: completedAnswers,
    isLoading: completedLoading,
    isError: completedError,
  } = useGetCompletedQuizes();

  const isLoading = quizzesLoading || completedLoading;
  const isError = quizzesError || completedError;

  const completedQuestionIds = new Set(
    (completedAnswers ?? []).map(
      (a: { question_id: string; answer_id: string }) => a.question_id
    )
  );

  const completedQuizzesCount = (allQuizzes ?? []).filter((quiz: any) => {
    const questions = quiz?.quiz?.[0]?.questions ?? [];
    if (!questions.length) return false;
    return questions.every((q: any) => completedQuestionIds.has(q.uuid));
  }).length;

  const totalQuizzes = allQuizzes?.length ?? 0;

  return {
    isLoading,
    isError,
    completedQuizzesCount,
    totalQuizzes,
  };
};
