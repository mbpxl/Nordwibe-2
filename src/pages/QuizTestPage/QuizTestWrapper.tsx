import { useMediaQuery } from "react-responsive";
import QuizTestPage from "./QuizTestPage"; // Мобильная версия
import QuizTestDesktopPage from "./QuizTestDesktopPage";

const QuizTestWrapper = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return <QuizTestDesktopPage />;
  }

  return <QuizTestPage />;
};

export default QuizTestWrapper;
