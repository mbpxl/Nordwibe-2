import { useMemo } from "react";
import { useGetCompletedQuizes } from "../../QuizPage/service/useGetCompletedQuizes";
import { useGetQuiz } from "../../QuizPage/service/useGetQuiz";

export interface MyQuiz {
  uuid: string; // UUID урока (из корневого uuid)
  title: string; // Название урока (из корневого title)
  description: string; // Описание урока (из корневого description)
  image_url: string; // Изображение урока (из корневого image_url)
  duration: number; // Длительность урока (из корневого duration)
  isCompleted: boolean;
}

export const useMyQuizzes = () => {
  const {
    data: allLessons,
    isLoading: isLessonsLoading,
    isError: isLessonsError,
  } = useGetQuiz();

  const {
    data: completedAnswers,
    isLoading: isCompletedLoading,
    isError: isCompletedError,
  } = useGetCompletedQuizes();

  const myQuizzes = useMemo((): MyQuiz[] => {
    if (!allLessons) return [];

    // Каждый урок - это отдельный квиз
    return allLessons.map((lesson) => {
      let isCompleted = false;

      // Для определения пройденности: проверяем, есть ли пройденные вопросы
      // во всех квизах этого урока
      if (completedAnswers && lesson.quiz && lesson.quiz.length > 0) {
        // Собираем все ID вопросов из всех квизов в этом уроке
        const allQuestionIds = new Set<string>();

        lesson.quiz.forEach((quiz) => {
          if (quiz.questions) {
            quiz.questions.forEach((question) => {
              allQuestionIds.add(question.uuid);
            });
          }
        });

        // Урок считается пройденным, если есть хотя бы один пройденный вопрос
        // в любом из квизов этого урока
        isCompleted = completedAnswers.some((answer) =>
          allQuestionIds.has(answer.question_id)
        );
      }

      return {
        uuid: lesson.uuid, // UUID урока
        title: lesson.title, // Название урока
        description: lesson.description, // Описание урока
        image_url: lesson.image_url, // Изображение урока
        duration: lesson.duration, // Длительность урока
        isCompleted,
      };
    });
  }, [allLessons, completedAnswers]);

  return {
    myQuizzes,
    isLoading: isLessonsLoading || isCompletedLoading,
    isError: isLessonsError || isCompletedError,
    completedQuizzesCount: myQuizzes.filter((quiz) => quiz.isCompleted).length,
    totalQuizzesCount: myQuizzes.length,
  };
};
