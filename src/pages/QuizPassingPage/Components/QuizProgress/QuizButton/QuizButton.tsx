import React, { useMemo } from "react";
import type { LessonsType } from "../../../types/quizDataTypes";
import next from "/icons/quiz/quiz-next.svg";

export interface QuizButtonProps {
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  isNext?: boolean;
  quizData: LessonsType[];
  currentSlide: number;
  isLastQuizStep?: boolean;
  isDesktop?: boolean;
  isQuizCompleted?: boolean;
}

const QuizButton: React.FC<QuizButtonProps> = ({
  setCurrentSlide,
  isNext,
  quizData,
  currentSlide,
  isLastQuizStep = false,
  isDesktop = false,
  isQuizCompleted = false,
}) => {
  // Определяем, должна ли кнопка быть отключена
  const isDisabled = useMemo(() => {
    if (isNext) {
      // Если это кнопка "Вперед"
      if (isLastQuizStep && isQuizCompleted) {
        // Если последний слайд и квиз пройден - отключаем
        return true;
      }
      return currentSlide === quizData.length - 1;
    } else {
      // Если это кнопка "Назад" - отключаем только на первом слайде
      return currentSlide === 0;
    }
  }, [currentSlide, quizData.length, isNext, isLastQuizStep, isQuizCompleted]);

  const handleClick = () => {
    if (isDisabled) return;

    setCurrentSlide((prev) => (isNext ? prev + 1 : prev - 1));
  };

  // Определяем, нужно ли скрывать кнопку (старая логика)
  const shouldHideButton = isLastQuizStep && isQuizCompleted && isNext;

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <button
          className={`${
            shouldHideButton ? "opacity-0 pointer-events-none" : "opacity-100"
          } w-[2.5rem] h-[2.5rem] rounded-[30px] flex justify-center items-center ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-sub-button hover:bg-purple-500"
          } transition-all duration-200`}
          onClick={handleClick}
          disabled={isDisabled}
          aria-label={isNext ? "Следующий слайд" : "Предыдущий слайд"}
        >
          <img
            src={next}
            alt={isNext ? "next" : "prev"}
            className={`${!isNext ? "rotate-180" : ""} ${
              isDisabled ? "opacity-50" : "opacity-100"
            } transition-opacity`}
          />
        </button>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <button
          className={`w-10 h-10 rounded-lg flex justify-center items-center ${
            isDisabled
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-purple-main hover:bg-purple-600"
          } transition-colors duration-200 ${
            shouldHideButton ? "opacity-50" : "opacity-100"
          }`}
          onClick={handleClick}
          disabled={isDisabled}
          aria-label={isNext ? "Следующий слайд" : "Предыдущий слайд"}
          title={isDisabled ? (isNext ? "Дальше нельзя" : "Назад нельзя") : ""}
        >
          <img
            src={next}
            alt={isNext ? "next" : "prev"}
            className={`${!isNext ? "rotate-180" : ""} ${
              isDisabled ? "opacity-40" : "opacity-100"
            } transition-opacity`}
          />
        </button>
      )}
    </>
  );
};

export default QuizButton;
