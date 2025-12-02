// QuizResultDesktopPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import {
  getResultMessage,
  getResultColor,
} from "../../shared/utils/quizResultUtils";
import { Link } from "react-router-dom";

const QuizResultDesktopPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/quiz");
    return null;
  }

  const { userAnswers, quizData, isAllCorrect } = state;

  const totalQuestions = quizData.questions.length;
  let correctCount = 0;

  quizData.questions.forEach((q: any) => {
    const selected = userAnswers[q.uuid] || [];
    const correctAnswers = q.answers
      .filter((a: any) => a.is_correct)
      .map((a: any) => a.uuid);

    const isCorrect =
      selected.length === correctAnswers.length &&
      selected.every((ansId: string) => correctAnswers.includes(ansId));

    if (isCorrect) correctCount++;
  });

  const percent = Math.round((correctCount / totalQuestions) * 100);
  const resultColor = getResultColor(percent);
  const resultMessage = getResultMessage(percent);

  return (
    <div className="max-w-[1340px] mt-12 mx-auto px-4 py-6">
      <div className="mb-6">
        <TopicHeader>
          <h1 className="text-2xl font-bold">Результаты теста</h1>
        </TopicHeader>
      </div>

      <div className="flex gap-8">
        {/* Левая колонка - статистика */}
        <div className="w-full max-w-[400px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Итоговый результат
              </h2>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-8 border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-800">
                      {percent}%
                    </div>
                    <div className="text-gray-600">
                      {correctCount} из {totalQuestions}
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent"
                  style={{
                    borderTopColor:
                      percent === 100
                        ? "#10B981"
                        : percent >= 60
                        ? "#F59E0B"
                        : "#EF4444",
                    transform: "rotate(45deg)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Правильные ответы</span>
                <span className="font-semibold text-green-600">
                  {correctCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Неправильные ответы</span>
                <span className="font-semibold text-red-600">
                  {totalQuestions - correctCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Всего вопросов</span>
                <span className="font-semibold text-gray-800">
                  {totalQuestions}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Действия
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/quiz")}
                className="w-full bg-purple-main text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
              >
                Пройти тест снова
              </button>
              <Link
                to="/quiz"
                className="block w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors"
              >
                Вернуться к квизам
              </Link>
              {!isAllCorrect && (
                <button
                  onClick={() => {
                    navigate("/quiz");
                  }}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Повторить материалы
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Правая колонка - детальные результаты */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm p-6 h-full">
            {/* Общее сообщение */}
            <div className="mb-8">
              <div
                className={`p-4 rounded-lg ${resultColor
                  .replace("bg-", "bg-")
                  .replace("500", "100")} border ${resultColor.replace(
                  "bg-",
                  "border-"
                )} mb-4`}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {percent === 100
                    ? "Отличная работа!"
                    : percent >= 60
                    ? "Хороший результат!"
                    : "Есть над чем поработать"}
                </h3>
                <p className="text-gray-700 leading-relaxed">{resultMessage}</p>
              </div>

              {!isAllCorrect && (
                <div className="p-4 border-2 border-purple-main rounded-xl bg-purple-50">
                  <p className="text-purple-800 font-medium text-center">
                    Для полного прохождения квиза необходимо правильно ответить
                    на все вопросы!
                  </p>
                </div>
              )}
            </div>

            {/* Детальные результаты по вопросам */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Подробные результаты
              </h2>

              {quizData.questions.map((question: any, index: number) => {
                const selected = userAnswers[question.uuid] || [];
                const correctAnswers = question.answers
                  .filter((a: any) => a.is_correct)
                  .map((a: any) => a.uuid);

                const isCorrect =
                  selected.length === correctAnswers.length &&
                  selected.every((ansId: string) =>
                    correctAnswers.includes(ansId)
                  );

                return (
                  <div
                    key={question.uuid}
                    className="p-6 border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCorrect
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {isCorrect ? "✓" : "✗"}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          Вопрос {index + 1}: {question.question}
                        </h3>
                        <p
                          className={`text-sm font-medium ${
                            isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isCorrect ? "Правильно" : "Неправильно"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {question.answers.map((ans: any) => {
                        const isSelected = selected.includes(ans.uuid);
                        const isCorrectAnswer = ans.is_correct;

                        return (
                          <div
                            key={ans.uuid}
                            className={`p-3 rounded-lg border-2 ${
                              isSelected && !isCorrectAnswer
                                ? "border-red-300 bg-red-50"
                                : isCorrectAnswer
                                ? "border-green-300 bg-green-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded flex items-center justify-center ${
                                  isCorrectAnswer
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300"
                                }`}
                              >
                                {isCorrectAnswer ? "✓" : ""}
                              </div>
                              <span className="text-gray-800">
                                {ans.answer}
                              </span>
                              {isSelected && !isCorrectAnswer && (
                                <span className="ml-auto text-red-600 font-medium">
                                  Ваш выбор
                                </span>
                              )}
                              {isSelected && isCorrectAnswer && (
                                <span className="ml-auto text-green-600 font-medium">
                                  Правильно выбрано
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultDesktopPage;
