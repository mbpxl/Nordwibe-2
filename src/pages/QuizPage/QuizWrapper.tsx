import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import QuizPage from "./QuizPage";
import QuizSlide from "../QuizPassingPage/Components/QuizSlide/QuizSlide";
import QuizDesktopPage from "./QuizDesktopPage";

const QuizWrapper = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { uuid } = useParams<{ uuid?: string }>();

  if (isDesktop) {
    return <QuizDesktopPage />;
  }

  if (uuid) {
    return <QuizSlide />;
  }

  return <QuizPage />;
};

export default QuizWrapper;
