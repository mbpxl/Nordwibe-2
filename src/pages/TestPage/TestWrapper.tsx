import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import TestPage from "./TestPage";
import TestPassing from "../TestPassingPage/TestPassingPage";
import TestDesktopPage from "./TestDesktopPage";

const TestWrapper = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { uuid } = useParams<{ uuid?: string }>();

  if (isDesktop) {
    return <TestDesktopPage />;
  }

  // Мобильная версия
  if (uuid) {
    return <TestPassing />;
  }

  return <TestPage />;
};

export default TestWrapper;
