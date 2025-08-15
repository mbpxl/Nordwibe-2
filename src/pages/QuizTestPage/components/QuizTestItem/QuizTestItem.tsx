import type { QuestionsType } from "../../../QuizPassingPage/types/quizDataTypes";

const QuizTestItem: React.FC<{ question: QuestionsType }> = ({ question }) => {
  return (
    <div className="text-[1rem] font-medium leading-[1.25rem] text-black-heading">
      <h3 className="font-semibold">{question.question}</h3>

      <div className="mt-2 flex flex-col gap-2">
        {question.answers.map((ans) => (
          <label
            key={ans.uuid}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input type="checkbox" className="w-4 h-4" />
            <span>{ans.answer}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizTestItem;
