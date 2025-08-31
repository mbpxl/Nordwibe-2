import type { QuizTypes } from "../../../QuizPassingPage/types/quizDataTypes";
import QuizTestItem from "../QuizTestItem/QuizTestItem";

const QuizTestList: React.FC<{
  quizes: QuizTypes[];
  userAnswers: Record<string, string[]>;
  setUserAnswers: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}> = ({ quizes, userAnswers, setUserAnswers }) => {
  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="flex flex-col gap-6">
        {quizes.map((quiz) =>
          quiz.questions.map((question) => (
            <QuizTestItem
              key={question.uuid}
              question={question}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default QuizTestList;
