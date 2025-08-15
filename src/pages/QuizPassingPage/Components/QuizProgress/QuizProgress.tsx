import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import type { LessonsType } from "../../types/quizDataTypes";
import GotoTest from "../GotoTest/GotoTest";
import QuizButton from "./QuizButton/QuizButton";

interface QuizProgressProps {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  quizData: LessonsType[];
	uuid?: string;
}

const QuizProgress: React.FC<QuizProgressProps> = ({quizData, setCurrentSlide, currentSlide, uuid}) => {
	const middleContent = quizData.length == currentSlide + 1 ? 
				<GotoTest uuid={uuid}/>
				 :
				<ProgressBar
          progress={String(currentSlide + 1)}
          totalProgress={quizData.length}
          title="прохождение квиза"
        />

  return (
    <div className="flex items-center gap-4 fixed bottom-0 left-0 w-full bg-white justify-center pb-8 px-4">
      <QuizButton
        setCurrentSlide={setCurrentSlide}
        isNext={false}
        quizData={quizData}
        currentSlide={currentSlide}
      />

      <div className="flex-1">
        {middleContent}
      </div>
			<QuizButton
        setCurrentSlide={setCurrentSlide}
        isNext={true}
        quizData={quizData}
        currentSlide={currentSlide}
				isLastQuizStep={quizData.length == currentSlide + 1}
      />
      
    </div>
  );
};

export default QuizProgress;
