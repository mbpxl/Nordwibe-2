import { useMemo } from "react";
import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import GotoTest from "../GotoTest/GotoTest";
import QuizButton from "./QuizButton/QuizButton";

interface QuizProgressProps {
  quizData: any[];
  setCurrentSlide: (value: number | ((prev: number) => number)) => void;
  currentSlide: number;
  uuid: string;
  isDesktop?: boolean;
  isQuizCompleted?: boolean;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  quizData,
  setCurrentSlide,
  currentSlide,
  uuid,
  isDesktop = false,
  isQuizCompleted = false,
}) => {
  // Изменяем логику отображения контента в середине
  const middleContent = useMemo(() => {
    if (quizData.length === currentSlide + 1) {
      // Если квиз пройден, показываем информационный блок
      if (isQuizCompleted) {
        return (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-700 font-medium text-center">
              Квиз уже пройден
            </p>
            <p className="text-gray-500 text-sm text-center">
              Вы можете просматривать материалы повторно
            </p>
          </div>
        );
      }
      // Иначе показываем кнопку перехода к тесту
      return <GotoTest uuid={uuid} isDesktop={isDesktop} />;
    }
    // Показываем прогресс бар для остальных слайдов
    return (
      <ProgressBar
        progress={String(currentSlide + 1)}
        totalProgress={quizData.length}
        title="прохождение"
      />
    );
  }, [currentSlide, quizData.length, isQuizCompleted, uuid, isDesktop]);

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

        <div className="flex-1 min-h-[80px] flex items-center justify-center">
          {middleContent}
        </div>

        <div className="w-16 flex justify-end">
          <QuizButton
            setCurrentSlide={setCurrentSlide}
            isNext={true}
            quizData={quizData}
            currentSlide={currentSlide}
            isLastQuizStep={quizData.length === currentSlide + 1}
            isDesktop={true}
            isQuizCompleted={isQuizCompleted}
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

      <div className="w-full min-h-[60px] flex items-center justify-center">
        {middleContent}
      </div>

      <div className="w-[64px] flex justify-end">
        <QuizButton
          setCurrentSlide={setCurrentSlide}
          isNext={true}
          quizData={quizData}
          currentSlide={currentSlide}
          isLastQuizStep={quizData.length === currentSlide + 1}
          isQuizCompleted={isQuizCompleted}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
