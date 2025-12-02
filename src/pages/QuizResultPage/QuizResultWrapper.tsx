import { useMediaQuery } from "react-responsive";
import QuizResultPage from "./QuizResultPage"; // Мобильная версия
import QuizResultDesktopPage from "./QuizResultDesktopPage";

const QuizResultWrapper = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return <QuizResultDesktopPage />;
  }

  return <QuizResultPage />;
};

export default QuizResultWrapper;
