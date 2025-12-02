import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import GotoTest from "../GotoTest/GotoTest";
import QuizButton from "./QuizButton/QuizButton";

interface QuizProgressProps {
  quizData: any[];
  setCurrentSlide: (value: number | ((prev: number) => number)) => void;
  currentSlide: number;
  uuid: string;
  isDesktop?: boolean;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  quizData,
  setCurrentSlide,
  currentSlide,
  uuid,
  isDesktop = false,
}) => {
  const middleContent =
    quizData.length == currentSlide + 1 ? (
      <GotoTest uuid={uuid} isDesktop={isDesktop} />
    ) : (
      <ProgressBar
        progress={String(currentSlide + 1)}
        totalProgress={quizData.length}
        title="прохождение"
      />
    );

  // Desktop версия
  if (isDesktop) {
    return (
      <div className="flex items-center gap-4 w-full">
        <div className="w-16 flex justify-start">
          <QuizButton
            setCurrentSlide={setCurrentSlide}
            isNext={false}
            quizData={quizData}
            currentSlide={currentSlide}
            isDesktop={true}
          />
        </div>

        <div className="flex-1">{middleContent}</div>

        <div className="w-16 flex justify-end">
          <QuizButton
            setCurrentSlide={setCurrentSlide}
            isNext={true}
            quizData={quizData}
            currentSlide={currentSlide}
            isLastQuizStep={quizData.length == currentSlide + 1}
            isDesktop={true}
          />
        </div>
      </div>
    );
  }

  // Мобильная версия
  return (
    <div className="flex items-center gap-4 fixed bottom-0 left-1/2 translate-x-[-50%] w-full bg-white justify-center pb-8 px-4 max-w-[344px]">
      <div className="w-[64px] flex justify-start">
        <QuizButton
          setCurrentSlide={setCurrentSlide}
          isNext={false}
          quizData={quizData}
          currentSlide={currentSlide}
        />
      </div>

      <div className="w-full">{middleContent}</div>

      <div className="w-[64px] flex justify-end">
        <QuizButton
          setCurrentSlide={setCurrentSlide}
          isNext={true}
          quizData={quizData}
          currentSlide={currentSlide}
          isLastQuizStep={quizData.length == currentSlide + 1}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
