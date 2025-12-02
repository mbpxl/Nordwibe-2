// QuizTestDesktopPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Loading from "../../shared/Components/Loading/Loading";
import Error from "../../shared/Components/ErrorPage/ErrorPage";
import { useGetQuiz } from "../QuizPage/service/useGetQuiz";
import QuizTestList from "./components/QuizTestList/QuizTestList";

const QuizTestDesktopPage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetQuiz();
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  const selectedQuiz = data.find((quiz: any) => quiz.uuid === uuid);
  if (!selectedQuiz) return <Error />;

  const allQuestions = selectedQuiz.quiz?.[0]?.questions || [];
  const totalQuestions = allQuestions.length;
  const answeredQuestions = Object.keys(userAnswers).length;
  const progressPercentage = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );

  const handleSubmit = () => {
    const allAnswered = allQuestions.every(
      (q: any) => userAnswers[q.uuid]?.length > 0
    );

    if (!allAnswered) {
      alert("Пожалуйста, ответьте на все вопросы перед отправкой");
      return;
    }

    navigate(`/quiz/${uuid}/result`, {
      state: {
        userAnswers,
        quizData: selectedQuiz.quiz?.[0],
        isAllCorrect: allQuestions.every((q: any) => {
          const selected = userAnswers[q.uuid] || [];
          const correctAnswers = q.answers
            .filter((a: any) => a.is_correct)
            .map((a: any) => a.uuid);
          return (
            selected.length === correctAnswers.length &&
            selected.every((ansId: string) => correctAnswers.includes(ansId))
          );
        }),
      },
    });
  };

  return (
    <div className="max-w-[1340px] mt-12 mx-auto px-4 py-6">
      <div className="mb-6">
        <TopicHeader>
          <h1 className="text-2xl font-bold">
            Тест по квизу: {selectedQuiz.title}
          </h1>
        </TopicHeader>
      </div>

      <div className="flex gap-8">
        {/* Левая колонка - навигация и информация */}
        <div className="w-full max-w-[400px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Прогресс</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Отвечено вопросов:</span>
                <span className="font-semibold">
                  {answeredQuestions} / {totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-main rounded-full h-3 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Вопросы
            </h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {allQuestions.map((question: any, index: number) => {
                const isAnswered = !!userAnswers[question.uuid]?.length;
                return (
                  <button
                    key={question.uuid}
                    onClick={() => {
                      const element = document.getElementById(
                        `question-${question.uuid}`
                      );
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      isAnswered
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                          isAnswered
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="font-medium truncate">
                        {question.question.substring(0, 50)}...
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Инструкция
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-main rounded-full mt-2 flex-shrink-0" />
                <span>Выберите один или несколько правильных ответов</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-main rounded-full mt-2 flex-shrink-0" />
                <span>
                  Нажмите на номер вопроса слева для быстрой навигации
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-main rounded-full mt-2 flex-shrink-0" />
                <span>Для завершения необходимо ответить на все вопросы</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Правая колонка - вопросы теста */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm p-6 h-full">
            <QuizTestList
              quizes={selectedQuiz.quiz}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              isDesktop={true}
            />

            {/* Кнопка отправки - фиксирована внизу */}
            <div className="sticky bottom-0 pt-6 mt-6 border-t border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Отвечено: {answeredQuestions} из {totalQuestions} вопросов
                </span>
                <button
                  onClick={handleSubmit}
                  disabled={answeredQuestions !== totalQuestions}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                    answeredQuestions === totalQuestions
                      ? "bg-purple-main hover:bg-purple-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Завершить тест
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTestDesktopPage;
