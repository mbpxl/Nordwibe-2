import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import GotoTest from "../GotoTest/GotoTest";
import QuizButton from "./QuizButton/QuizButton";

interface QuizProgressProps {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  quizData: any;
  isTest?: boolean;
  uuid?: string;
  answers?: any;
  scaleMap?: any;
  disabled?: boolean;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  quizData,
  setCurrentSlide,
  currentSlide,
  uuid,
  answers,
  scaleMap,
  isTest,
  disabled,
}) => {
  const middleContent =
    quizData.length == currentSlide + 1 ? (
      <GotoTest
        uuid={uuid}
        isTest={isTest}
        answers={answers}
        scaleMap={scaleMap}
        disabled={disabled}
      />
    ) : (
      <ProgressBar
        progress={String(currentSlide + 1)}
        totalProgress={quizData.length}
        title="прохождение"
      />
    );

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
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
