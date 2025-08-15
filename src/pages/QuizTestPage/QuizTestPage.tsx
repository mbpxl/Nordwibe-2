import { useParams } from "react-router-dom";
import Error from "../../shared/Components/ErrorPage/ErrorPage";
import QuizSlideHeader from "../QuizPassingPage/Components/QuizSlideHeader/quizSlideHeader";
import { mockQuizzes } from "../QuizPassingPage/misc/quizData";
import QuizImage from "../QuizPassingPage/Components/QuizTypography/QuizImage";
import QuizTestList from "./components/QuizTestList/QuizTestList";
import QuizTestAction from "./components/QuizTestAction/QuizTestAction";

const QuizTestPage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const selectedQuiz = mockQuizzes.find((quiz) => quiz.uuid === uuid);
  console.log(uuid);
  if (!selectedQuiz) {
    return <Error />;
  }

  const quizData = selectedQuiz.quiz[0];
  console.log(selectedQuiz);

  return (
    <div className="flex flex-col max-w-[21.5rem] m-auto relative min-h-screen">
      <QuizSlideHeader heading={mockQuizzes[0].title} />
      <QuizImage image_url={quizData.image_url} />

      <QuizTestList quizes={[quizData]} />

      <QuizTestAction />
    </div>
  );
};

export default QuizTestPage;
