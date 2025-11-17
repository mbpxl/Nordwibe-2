import type { QuestionsType } from "../../../QuizPassingPage/types/quizDataTypes";

type Props = {
  index: number;
  question: QuestionsType;
  userAnswers: Record<string, string[]>;
  setUserAnswers: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

const QuizTestItem: React.FC<Props> = ({
  index,
  question,
  userAnswers,
  setUserAnswers,
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
    <div className="text-[1rem] font-medium leading-[1.25rem] text-black-heading">
      <h3 className="font-semibold">
        {index + 1 + ". "}
        {question.question}
      </h3>
      <div className="mt-2 flex flex-col gap-2">
        {question.answers.map((ans) => (
          <label
            key={ans.uuid}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={selectedAnswers.includes(ans.uuid)}
              onChange={() => handleChange(ans.uuid)}
            />
            <span>{ans.answer}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizTestItem;
