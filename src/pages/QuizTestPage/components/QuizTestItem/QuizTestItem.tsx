import type { QuestionsType } from "../../../QuizPassingPage/types/quizDataTypes";

type Props = {
  index: number;
  question: QuestionsType;
  userAnswers: Record<string, string[]>;
  setUserAnswers: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  isDesktop?: boolean;
};

const QuizTestItem: React.FC<Props> = ({
  index,
  question,
  userAnswers,
  setUserAnswers,
  isDesktop = false,
}) => {
  const selectedAnswers = userAnswers[question.uuid] || [];

  const handleChange = (answerUuid: string) => {
    setUserAnswers((prev) => {
      const current = prev[question.uuid] || [];
      const updated = current.includes(answerUuid)
        ? current.filter((id) => id !== answerUuid) // снять чекбокс
        : [...current, answerUuid]; // добавить чекбокс
      return { ...prev, [question.uuid]: updated };
    });
  };

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <div className="text-[1rem] font-medium leading-[1.25rem] text-black-heading">
          <h3 className="font-semibold">
            {index + 1 + ". "}
            {question.question}
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            {question.answers.map((ans) => (
              <label
                key={ans.uuid}
                className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-main"
                  checked={selectedAnswers.includes(ans.uuid)}
                  onChange={() => handleChange(ans.uuid)}
                />
                <span>{ans.answer}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-purple-main text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-lg">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {question.question}
              </h3>
              <p className="text-gray-600 text-sm">
                Выберите один или несколько правильных ответов
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.answers.map((ans) => (
              <label
                key={ans.uuid}
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedAnswers.includes(ans.uuid)
                    ? "border-purple-main bg-purple-50"
                    : "border-gray-200 bg-gray-50 hover:border-purple-300"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-purple-main rounded focus:ring-purple-500"
                    checked={selectedAnswers.includes(ans.uuid)}
                    onChange={() => handleChange(ans.uuid)}
                  />
                </div>
                <span className="text-gray-800 font-medium select-none">
                  {ans.answer}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizTestItem;
