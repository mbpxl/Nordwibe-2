// QuizTestList.tsx
import type { QuizTypes } from "../../../QuizPassingPage/types/quizDataTypes";
import QuizTestItem from "../QuizTestItem/QuizTestItem";

interface QuizTestListProps {
  quizes: QuizTypes[];
  userAnswers: Record<string, string[]>;
  setUserAnswers: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  isDesktop?: boolean;
}

const QuizTestList: React.FC<QuizTestListProps> = ({
  quizes,
  userAnswers,
  setUserAnswers,
  isDesktop = false,
}) => {
  const allQuestions = quizes.flatMap((quiz) => quiz.questions);

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex flex-col gap-9">
            {quizes.map((quiz) =>
              quiz.questions.map((question, index) => (
                <QuizTestItem
                  key={question.uuid}
                  index={index}
                  question={question}
                  userAnswers={userAnswers}
                  setUserAnswers={setUserAnswers}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div className="space-y-8 pb-6">
          {allQuestions.map((question, index) => (
            <div key={question.uuid} id={`question-${question.uuid}`}>
              <QuizTestItem
                index={index}
                question={question}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                isDesktop={true}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default QuizTestList;
