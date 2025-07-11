import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import type { quizDataTypes } from "../../types/quizDataTypes";
import QuizButton from "./QuizButton/QuizButton";

interface QuizProgressProps {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  quizData: quizDataTypes[];
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentSlide,
  setCurrentSlide,
  quizData,
}) => {
  return (
    <div className="flex items-center gap-4 mt-3">
      <QuizButton
        setCurrentSlide={setCurrentSlide}
        isNext={false}
        quizData={quizData}
        currentSlide={currentSlide}
      />

      <div className="flex-1">
        <ProgressBar
          progress={String(currentSlide + 1)}
          totalProgress={quizData.length}
          title="прохождение квиза"
        />
      </div>

      <QuizButton
        setCurrentSlide={setCurrentSlide}
        isNext={true}
        quizData={quizData}
        currentSlide={currentSlide}
      />
    </div>
  );
};

export default QuizProgress;
