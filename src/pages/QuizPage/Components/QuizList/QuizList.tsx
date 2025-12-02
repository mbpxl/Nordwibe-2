import { useGetQuiz } from "../../service/useGetQuiz";
import { useGetCompletedQuizes } from "../../service/useGetCompletedQuizes";
import Loading from "../../../../shared/Components/Loading/Loading";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import AllQuizCompleted from "../../../QuizPage/Components/AllQuizCompleted/AllQuizCompleted";
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

  const unCompletedQuizzes = quizzesWithCompletion.filter(
    (q: any) => !q.isCompleted
  );
  const completedQuizessCount =
    quizzesWithCompletion.length - unCompletedQuizzes.length;

  const isAllQuizesCompleted =
    completedQuizessCount === quizzesWithCompletion.length;

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
                      image_url={baseURLforImages + item.image_url}
                      isDesktop={false}
                    />
                  </div>
                ))}
              </div>
            )}
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
            {isAllQuizesCompleted ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-lg font-medium mb-2">
                  Все квизы пройдены!
                </h3>
                <p className="text-gray-500 text-center">
                  Вы успешно прошли все доступные квизы
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {unCompletedQuizzes.map((item: any, index: any) => (
                  <div key={index}>
                    <QuizItem
                      uuid={item.uuid}
                      time={"5"}
                      title={item.title}
                      description={item.description}
                      image_url={baseURLforImages + item.image_url}
                      isDesktop={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizList;
