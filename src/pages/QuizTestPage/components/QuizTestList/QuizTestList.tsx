import type { QuizTypes } from "../../../QuizPassingPage/types/quizDataTypes";
import QuizTestItem from "../QuizTestItem/QuizTestItem";

const QuizTestList: React.FC<{ quizes: QuizTypes[] }> = ({ quizes }) => {
  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="flex flex-col gap-6">
        {quizes.map((quiz) =>
          quiz.questions.map((question) => (
            <QuizTestItem key={question.uuid} question={question} />
          ))
        )}
      </div>
    </div>
  );
};

export default QuizTestList;
