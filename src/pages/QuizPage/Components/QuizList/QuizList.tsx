import { useGetQuiz } from "../../service/useGetQuiz";
import { useGetCompletedQuizes } from "../../service/useGetCompletedQuizes";
import Loading from "../../../../shared/Components/Loading/Loading";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import QuizItem from "../QuizItem/QuizItem";
import { baseURLforImages } from "../../../../shared/plugin/axios";

interface QuizListProps {
  isDesktop?: boolean;
}

const QuizList = ({ isDesktop = false }: QuizListProps) => {
  const { data: allQuizes, isLoading: isQuizzesLoading } = useGetQuiz();
  const { data: completedAnswers, isLoading: isCompletedLoading } =
    useGetCompletedQuizes();

  if (isQuizzesLoading || isCompletedLoading) {
    return <Loading />;
  }

  if (!allQuizes) {
    return <Error />;
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

  const completedQuizessCount = quizzesWithCompletion.filter(
    (q: any) => q.isCompleted
  ).length;

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Wrapper
          className={`pt-1 pb-12 bg-purple-background-wrap flex flex-col items-center min-h-screen`}
        >
          <ProgressBar
            progress={completedQuizessCount}
            totalProgress={quizzesWithCompletion.length}
            title={"квиз"}
          />
          <div className="max-w-[600px] w-full">
            {quizzesWithCompletion.map((item: any, index: any) => (
              <div key={index} className="mb-4 relative">
                <QuizItem
                  uuid={item.uuid}
                  time={"5"}
                  title={item.title}
                  description={item.description}
                  image_url={baseURLforImages + item.image_url}
                  isDesktop={false}
                  isCompleted={item.isCompleted}
                />
              </div>
            ))}
          </div>
        </Wrapper>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div className="h-full flex flex-col">
          <div className="p-6 pb-4">
            <ProgressBar
              progress={completedQuizessCount}
              totalProgress={quizzesWithCompletion.length}
              title={"квиз"}
            />
          </div>

          {/* Список квизов с прокруткой */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-4">
              {quizzesWithCompletion.map((item: any, index: any) => (
                <div key={index} className="relative">
                  <QuizItem
                    uuid={item.uuid}
                    time={"5"}
                    title={item.title}
                    description={item.description}
                    image_url={baseURLforImages + item.image_url}
                    isDesktop={true}
                    isCompleted={item.isCompleted}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizList;
