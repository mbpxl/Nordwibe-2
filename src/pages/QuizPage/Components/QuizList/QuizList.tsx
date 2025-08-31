import Loading from "../../../../shared/Components/Loading/Loading";
import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { useGetCompletedQuizes } from "../../service/useGetCompletedQuizes";
import { useGetQuiz } from "../../service/useGetQuiz";
import AllQuizCompleted from "../AllQuizCompleted/AllQuizCompleted";
import QuizItem from "../QuizItem/QuizItem";

const QuizList = () => {
  const { data: allQuizes, isLoading: isQuizzesLoading } = useGetQuiz();
  const { data: completedAnswers, isLoading: isCompletedLoading } =
    useGetCompletedQuizes();

  if (isQuizzesLoading || isCompletedLoading) {
    return <Loading />;
  }

  const completedQuestionIds = new Set(
    completedAnswers?.map((a: any) => a.question_id)
  );

  const quizzesWithCompletion = allQuizes.map((quiz: any) => {
    const quizQuestions = quiz.quiz[0].questions.map((q: any) => q.uuid);
    const isCompleted = quizQuestions.every((qid: string) =>
      completedQuestionIds.has(qid)
    );
    return { ...quiz, isCompleted };
  });

  const unCompletedQuizzes = quizzesWithCompletion.filter(
    (q: any) => !q.isCompleted
  );
  const completedQuizessCount =
    quizzesWithCompletion.length - unCompletedQuizzes.length;

  const isAllQuizesCompleted =
    completedQuizessCount === quizzesWithCompletion.length;
  return (
    <Wrapper
      className={`pt-1 pb-12
         bg-purple-background-wrap
      flex flex-col items-center min-h-screen`}
    >
      <ProgressBar
        progress={completedQuizessCount}
        totalProgress={quizzesWithCompletion.length}
        title={"квиз"}
      />
      <div className="max-w-[600px]">
        {isAllQuizesCompleted ? (
          <AllQuizCompleted title={"квизы"} />
        ) : (
          <div className="">
            {unCompletedQuizzes.map((item: any, index: any) => (
              <div key={index} className="mb-4">
                <QuizItem
                  uuid={item.uuid}
                  time={"5"}
                  title={item.title}
                  description={item.description}
                  image_url={
                    "https://3133319-bo35045.twc1.net/" + item.image_url
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default QuizList;
